"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function UserDetail() {
  const [user, setUser] = useState({ email: "", username: "", saldo: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleTopUp = async () => {
    try {
      const response = await fetch("/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: topUpAmount }),
      });
      if (!response.ok) {
        throw new Error("Failed to top up saldo");
      }
      const data = await response.json();
      setUser(data);
      setShowTopUp(false);
      setTopUpAmount("");
    } catch (error) {
      console.error("Error topping up saldo:", error);
      setError("Failed to top up saldo");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl xl:text-4xl text-center font-bold md:mb-10">Profile</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-20">
        <div className="flex items-center justify-center my-10 md:my-0 md:mt-20">
          <Image
            src="/profile-icon.png"
            alt="profile"
            width={512}
            height={512}
            className="rounded-full w-8/12 xl:w-6/12"
          />
        </div>
        <div>
          <div className="mt-4 flex flex-col gap-y-2 xl:text-lg">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Saldo:</strong> Rp{user.saldo}
            </p>
          </div>
          <Button onClick={() => setShowTopUp(true)} className="my-10 xl:text-lg">
            Top Up Saldo
          </Button>

          {showTopUp && (
            <div className="mt-4 p-4 border rounded">
              <h2 className="text-xl font-bold">Top Up Saldo</h2>
              <input
                type="number"
                className="mt-2 p-2 border rounded w-full"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <Button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleTopUp}
              >
                Confirm Top Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}