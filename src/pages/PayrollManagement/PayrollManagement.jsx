import { useMemo, useState } from "react";
import Layout from "../../components/Layout";
import {
  PAYROLL_TABS,
  INITIAL_ALLOWANCES,
  INITIAL_DEDUCTIONS,
  INITIAL_PAYROLL_EMPLOYEES,
  INITIAL_FORM16_RECORDS,
  INITIAL_LOAN_REQUESTS,
} from "./constants";
import PayrollHeader from "./components/PayrollHeader";
import PayrollTabs from "./components/PayrollTabs";
import PayrollOverview from "./components/PayrollOverview";
import SalaryStructureBuilder from "./components/SalaryStructureBuilder";
import PayrollRunTab from "./components/PayrollRunTab";
import PayslipsTab from "./components/PayslipsTab";
import LoanAdvanceTab from "./components/LoanAdvanceTab";
import Form16Tab from "./components/Form16Tab";

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [baseSalary, setBaseSalary] = useState(50000);
  const [allowances, setAllowances] = useState(INITIAL_ALLOWANCES);
  const [deductions, setDeductions] = useState(INITIAL_DEDUCTIONS);
  const [payrollMonth, setPayrollMonth] = useState("2026-04");
  const [runEmployees, setRunEmployees] = useState(INITIAL_PAYROLL_EMPLOYEES);
  const [payslips, setPayslips] = useState([]);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [runStatus, setRunStatus] = useState("");
  const [loanRequests, setLoanRequests] = useState(INITIAL_LOAN_REQUESTS);
  const [loanForm, setLoanForm] = useState({ employee: "", amount: 0, tenure: 3, purpose: "" });
  const [loanMessage, setLoanMessage] = useState("");
  const [form16Records, setForm16Records] = useState(INITIAL_FORM16_RECORDS);

  const allowanceTotal = useMemo(() => allowances.reduce((sum, item) => sum + Number(item.amount || 0), 0), [allowances]);
  const deductionTotal = useMemo(() => deductions.reduce((sum, item) => sum + Number(item.amount || 0), 0), [deductions]);

  const salaryPreview = useMemo(() => {
    const gross = baseSalary + allowanceTotal;
    const net = Math.max(gross - deductionTotal, 0);
    return { gross, net };
  }, [baseSalary, allowanceTotal, deductionTotal]);

  const processedEmployees = useMemo(() => {
    const approvedLoans = loanRequests.filter((item) => item.status === "Approved");

    return runEmployees.map((employee) => {
      const employeeLoan = approvedLoans.find((loan) => loan.employee === employee.employee);
      const emi = employeeLoan ? Math.round(employeeLoan.amount / employeeLoan.tenure) : 0;
      const lopDeduction = Math.round((employee.baseSalary / 30) * employee.lopDays);
      const grossPay = employee.baseSalary + allowanceTotal + employee.overtimePay;
      const totalDeductions = deductionTotal + lopDeduction + emi;
      const netPay = Math.max(grossPay - totalDeductions, 0);

      return {
        ...employee,
        gross: grossPay,
        deductions: totalDeductions,
        netPay,
        loanEmi: emi,
        status: employee.status === "Pending Review" ? "Pending Review" : "Ready",
      };
    });
  }, [allowanceTotal, deductionTotal, loanRequests, runEmployees]);

  const payrollStats = useMemo(() => {
    const employeeCount = processedEmployees.length;
    const grossPayroll = processedEmployees.reduce((sum, item) => sum + item.gross, 0);
    const netPayroll = processedEmployees.reduce((sum, item) => sum + item.netPay, 0);
    const pendingReviews = processedEmployees.filter((item) => item.status === "Pending Review").length;

    return { employeeCount, grossPayroll, netPayroll, pendingReviews };
  }, [processedEmployees]);

  const processPayroll = () => {
    const generated = processedEmployees.map((employee) => ({
      id: employee.id,
      employee: employee.employee,
      department: employee.department,
      month: payrollMonth,
      baseSalary: employee.baseSalary,
      grossPay: employee.gross,
      deductions: employee.deductions,
      netPay: employee.netPay,
      breakdown: [
        { label: "Base Salary", amount: employee.baseSalary },
        { label: "Allowances", amount: allowanceTotal },
        { label: "Overtime", amount: employee.overtimePay },
        { label: "Lop Deduction", amount: -Math.round((employee.baseSalary / 30) * employee.lopDays) },
        { label: "Standard Deductions", amount: -deductionTotal },
        { label: "Loan EMI", amount: -employee.loanEmi },
      ],
    }));

    setRunEmployees((prev) => prev.map((employee) => ({ ...employee, status: employee.status === "Pending Review" ? "Pending Review" : "Processed" })));
    setPayslips(generated);
    setSelectedSlip(generated[0] || null);
    setRunStatus(`Payroll processed for ${payrollMonth}. ${generated.length} payslips generated.`);
    setActiveTab("Payslips");
  };

  const updateAllowance = (id, key, value) => {
    setAllowances((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const updateDeduction = (id, key, value) => {
    setDeductions((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addAllowance = () => {
    setAllowances((prev) => [...prev, { id: createId(), label: "New Allowance", amount: 0 }]);
  };

  const addDeduction = () => {
    setDeductions((prev) => [...prev, { id: createId(), label: "New Deduction", amount: 0 }]);
  };

  const removeAllowance = (id) => setAllowances((prev) => prev.filter((item) => item.id !== id));
  const removeDeduction = (id) => setDeductions((prev) => prev.filter((item) => item.id !== id));

  const onLoanChange = (key, value) => {
    setLoanForm((prev) => ({ ...prev, [key]: value }));
    setLoanMessage("");
  };

  const submitLoan = (e) => {
    e.preventDefault();

    if (!loanForm.employee.trim() || !loanForm.amount || !loanForm.purpose.trim()) {
      setLoanMessage("Please fill all loan request fields.");
      return;
    }

    setLoanRequests((prev) => [
      ...prev,
      {
        id: createId(),
        employee: loanForm.employee.trim(),
        amount: loanForm.amount,
        tenure: loanForm.tenure,
        purpose: loanForm.purpose.trim(),
        status: "Pending",
      },
    ]);
    setLoanForm({ employee: "", amount: 0, tenure: 3, purpose: "" });
    setLoanMessage("Loan / advance request submitted successfully.");
  };

  const updateLoanStatus = (id, status) => {
    setLoanRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setLoanMessage(status === "Approved" ? "Loan request approved and will reflect in payroll calculations." : "Loan request rejected.");
  };

  const handlePayslipPrint = (slip) => {
    setSelectedSlip(slip);
    window.print();
  };

  const handlePayslipDownload = (slip) => {
    const csv = [
      ["Field", "Value"],
      ["Employee", slip.employee],
      ["Month", slip.month],
      ["Base Salary", slip.baseSalary],
      ["Gross Pay", slip.grossPay],
      ["Deductions", slip.deductions],
      ["Net Pay", slip.netPay],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slip.employee}-payslip-${slip.month}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadForm16 = (record) => {
    const content = `Form 16\nFinancial Year: ${record.fiscalYear}\nGenerated On: ${record.generatedOn}\nStatus: ${record.status}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `form16-${record.fiscalYear}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setForm16Records((prev) => prev.map((item) => (item.id === record.id ? { ...item, status: "Downloaded" } : item)));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <PayrollHeader />
        <PayrollTabs tabs={PAYROLL_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Overview" && <PayrollOverview stats={payrollStats} />}

        {activeTab === "Salary Structure" && (
          <SalaryStructureBuilder
            baseSalary={baseSalary}
            allowances={allowances}
            deductions={deductions}
            onBaseSalaryChange={setBaseSalary}
            onAddAllowance={addAllowance}
            onUpdateAllowance={updateAllowance}
            onRemoveAllowance={removeAllowance}
            onAddDeduction={addDeduction}
            onUpdateDeduction={updateDeduction}
            onRemoveDeduction={removeDeduction}
            totals={{
              allowances: allowanceTotal,
              deductions: deductionTotal,
              gross: salaryPreview.gross,
              net: salaryPreview.net,
            }}
          />
        )}

        {activeTab === "Payroll Run" && (
          <PayrollRunTab
            month={payrollMonth}
            onMonthChange={setPayrollMonth}
            employees={processedEmployees}
            onProcessPayroll={processPayroll}
            runStatus={runStatus}
          />
        )}

        {activeTab === "Payslips" && (
          <PayslipsTab
            slips={payslips}
            selectedSlip={selectedSlip}
            onSelectSlip={setSelectedSlip}
            onPrintSlip={handlePayslipPrint}
            onDownloadSlip={handlePayslipDownload}
          />
        )}

        {activeTab === "Loans & Advances" && (
          <LoanAdvanceTab
            form={loanForm}
            requests={loanRequests}
            onChange={onLoanChange}
            onSubmit={submitLoan}
            onUpdateStatus={updateLoanStatus}
            message={loanMessage}
          />
        )}

        {activeTab === "Form 16" && (
          <Form16Tab records={form16Records} onDownload={downloadForm16} />
        )}
      </div>
    </Layout>
  );
};

export default PayrollManagement;
