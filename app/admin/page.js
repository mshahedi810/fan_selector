"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default function Page() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);

  // بررسی لاگین
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    const expire = parseInt(localStorage.getItem("adminExpire"), 10);

    if (!isLoggedIn || !expire || Date.now() > expire) {
      router.push("/login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  // گرفتن دیتا از API
  useEffect(() => {
    if (!allowed) return;

    const fetchFans = async () => {
      try {
        const res = await fetch("api/fans/variants");
        if (!res.ok) throw new Error("Failed to fetch fans");
        const data = await res.json();
        setFans(data);
      } catch (err) {
        console.error("Failed to fetch fans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFans();
  }, [allowed]);

  if (!allowed || loading) return null;

  return (
    <AdminDashboard 
      fans={fans} 
      onAddFan={(fan) => {
        setFans(prev => [...prev, fan]);
        console.log("Add:", fan);
      }}
      onUpdateFan={(updatedFan) => {
        setFans(prev => prev.map(f => f._id === updatedFan._id ? updatedFan : f));
        console.log("Update:", updatedFan);
      }}
      onDeleteFan={(id) => {
        setFans(prev => prev.filter(f => f._id !== id));
        console.log("Delete:", id);
      }}
      onAddFansBatch={(newFans) => {
        setFans(prev => [...prev, ...newFans]);
        console.log("Batch Add:", newFans);
      }}
    />
  );
}
