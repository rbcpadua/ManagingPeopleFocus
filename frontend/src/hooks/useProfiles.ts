import { useState, useEffect } from "react";

const API_URL = "http://localhost:7000/api";

export type ProfileProps = {
  id?: number;
  name: string;
  description: string;
};

export function useProfiles() {
  const [profiles, setProfiles] = useState<ProfileProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProfiles() {
    setLoading(true);
    const res = await fetch(`${API_URL}/profiles`);
    const data = await res.json();
    setProfiles(data);
    setLoading(false);
  }

  async function createProfiles(profiles: ProfileProps) {
    await fetch(`${API_URL}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profiles),
    });
    await fetchProfiles();
  }

  async function updateProfiles(id: number, profiles: ProfileProps) {
    await fetch(`${API_URL}/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profiles),
    });
    await fetchProfiles();
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return { profiles, loading, createProfiles, updateProfiles };
}
