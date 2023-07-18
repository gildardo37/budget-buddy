import { Header } from "@/components/Header";
import { NextPage } from "next";
import { useRouter } from "next/router";

const TransactionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <section>
      <Header title="Transaction details" showBack />
      <p>Hello {id}</p>
    </section>
  );
};

export default TransactionPage;
