import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/App";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ClipboardList, 
  FileSearch, 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

const PHASES = ["Planning", "Fieldwork", "Reporting", "Follow-up"];
const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

const AuditWorkflow = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phase: "Planning",
    priority: "Medium",
    due_date: "",
    assigned_to: ""
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API}/audit-tasks`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch audit tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.due_date) delete payload.due_date;
      
      if (editingTask) {
        await axios.put(`${API}/audit-tasks/${editingTask.task_id}`, payload);
        toast.success("Task updated successfully");
      } else {
        await axios.post(`${API}/audit-tasks`, payload);
        toast.success("Task created successfully");
      }
      setDialogOpen(false);
      setEditingTask(null);
      resetForm();
      fetchTasks();
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`${API}/audit-tasks/${taskId}`, { status: newStatus });
      toast.success("Status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${API}/audit-tasks/${taskId}`);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      phase: task.phase,
      priority: task.priority,
      due_date: task.due_date ? task.due_date.split("T")[0] : "",
      assigned_to: task.assigned_to || ""
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      phase: "Planning",
      priority: "Medium",
      due_date: "",
      assigned_to: ""
    });
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case "Planning": return ClipboardList;
      case "Fieldwork": return FileSearch;
      case "Reporting": return FileText;
      case "Follow-up": return CheckCircle;
      default: return ClipboardList;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-zinc-500/20 text-zinc-400";
      case "In Progress": return "bg-blue-500/20 text-blue-500";
      case "Completed": return "bg-green-500/20 text-green-500";
      case "Blocked": return "bg-red-500/20 text-red-500";
      default: return "bg-zinc-500/20 text-zinc-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "bg-red-500/20 text-red-500 border-red-500/30";
      case "High": return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "Medium": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "Low": return "bg-green-500/20 text-green-500 border-green-500/30";
      default: return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  const getTasksByPhase = (phase) => tasks.filter((t) => t.phase === phase);

  return (
    <DashboardLayout 
      title="Audit Workflow" 
      subtitle="End-to-end audit task management and tracking"
    >
      {/* Phase Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-testid="phase-summary">
        {PHASES.map((phase) => {
          const PhaseIcon = getPhaseIcon(phase);
          const phaseTasks = getTasksByPhase(phase);
          const completed = phaseTasks.filter((t) => t.status === "Completed").length;
          
          return (
            <Card key={phase} className="glass border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <PhaseIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold">{phase}</p>
                    <p className="text-sm text-zinc-400">
                      {completed}/{phaseTasks.length} completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-semibold text-xl">Task Board</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="btn-primary" 
              onClick={() => { setEditingTask(null); resetForm(); }}
              data-testid="add-task-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingTask ? "Edit Task" : "Add New Task"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Task Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                  className="bg-zinc-800 border-zinc-700"
                  data-testid="task-title-input"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the task"
                  required
                  className="bg-zinc-800 border-zinc-700"
                  data-testid="task-description-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phase</Label>
                  <Select
                    value={formData.phase}
                    onValueChange={(value) => setFormData({ ...formData, phase: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700" data-testid="task-phase-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {PHASES.map((phase) => (
                        <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700" data-testid="task-priority-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Due Date (Optional)</Label>
                <Input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label>Assigned To (Optional)</Label>
                <Input
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  placeholder="Assignee name"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <Button type="submit" className="w-full btn-primary" data-testid="save-task-btn">
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban-style Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="task-board">
        {PHASES.map((phase) => {
          const PhaseIcon = getPhaseIcon(phase);
          const phaseTasks = getTasksByPhase(phase);

          return (
            <div key={phase} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <PhaseIcon className="w-5 h-5 text-blue-500" />
                <h3 className="font-heading font-semibold">{phase}</h3>
                <Badge variant="outline" className="ml-auto border-zinc-700">
                  {phaseTasks.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div className="h-32 skeleton rounded-lg"></div>
                ) : phaseTasks.length === 0 ? (
                  <div className="p-4 rounded-lg border border-dashed border-zinc-700 text-center text-zinc-500 text-sm">
                    No tasks
                  </div>
                ) : (
                  phaseTasks.map((task) => (
                    <Card 
                      key={task.task_id} 
                      className="glass border-white/10 card-hover"
                      data-testid={`task-card-${task.task_id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <Select
                            value={task.status}
                            onValueChange={(value) => handleStatusChange(task.task_id, value)}
                          >
                            <SelectTrigger className={`h-7 text-xs w-auto ${getStatusColor(task.status)} border-0`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleEdit(task)}
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleDelete(task.task_id)}
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          </div>
                        </div>

                        {task.assigned_to && (
                          <div className="mt-3 pt-3 border-t border-zinc-800">
                            <p className="text-xs text-zinc-500">
                              Assigned to: <span className="text-zinc-300">{task.assigned_to}</span>
                            </p>
                          </div>
                        )}

                        {task.due_date && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
                            <Clock className="w-3 h-3" />
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default AuditWorkflow;
