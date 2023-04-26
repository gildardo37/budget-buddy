import { BudgetForm } from "@/components/BudgetForm";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="w-full p-4 bg-slate-100 min-h-screen">
      <h2>Budget Buddy app</h2>
      <BudgetForm />
    </main>
  );
};

export default Home;
