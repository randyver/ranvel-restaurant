"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { z } from "zod";
import { toast } from "sonner";

export default function UserDetail() {
  const [user, setUser] = useState({ email: "", username: "", saldo: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [validationError, setValidationError] = useState("");

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

  const topUpSchema = z
    .number()
    .min(10000)
    .max(500000)
    .refine((value) => value % 10000 === 0, {
      message: "Amount must be a multiple of 10,000",
    });

  const handleTopUp = async () => {
    const amount = parseInt(topUpAmount, 10);
    try {
      topUpSchema.parse(amount); // Validate amount
      setValidationError("");

      const response = await fetch("/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to top up saldo");
      }

      const data = await response.json();
      setUser(data);
      setTopUpAmount("");

      toast.success("Saldo topped up successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      } else {
        console.error("Error topping up saldo:", error);
        setError("Failed to top up saldo");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl xl:text-4xl text-center font-bold md:mb-10">
        Profile
      </h1>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="my-10 xl:text-lg">Top Up Saldo</Button>
            </PopoverTrigger>
            <PopoverContent>
              <h2 className="font-bold xl:text-lg">Top Up Saldo</h2>
              <Input
                type="number"
                value={topUpAmount}
                className="my-6"
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount"
              />
              {validationError && (
                <div className="text-red-500 mt-2">{validationError}</div>
              )}
              <Button className="xl:text-lg" onClick={handleTopUp}>
                Confirm Top Up
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
