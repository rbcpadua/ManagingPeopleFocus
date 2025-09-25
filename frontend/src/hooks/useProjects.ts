import { useState, useEffect } from "react";

const API_URL = "http://localhost:7000/api";

export type ProjectProps = {
  id?: number;
  name: string;
  description: string;
  createdAt: string;
  endDate: string;
  status: string;
  createdBy: string;
  userId?: number;
};

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function createProject(project: ProjectProps) {
    await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    await fetchProjects();
  }

  async function updateProject(id: number, project: ProjectProps) {
    await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    await fetchProjects();
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, createProject, updateProject };
}
