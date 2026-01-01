"use client";

import { useEffect, useState } from "react";
import CustomerPortal from "@/components/CustomerPortal";

export default function Page() {
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFans = async () => {
      try {
        const res = await fetch("/api/fans/variants"); // مسیر API واریانت‌ها
        if (!res.ok) throw new Error("Failed to fetch fans");
        const data = await res.json();
        setFans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFans();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">در حال بارگذاری...</p>;

  return <CustomerPortal fans={fans} />;
}
