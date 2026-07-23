import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Dumbbell,
  Clipboard,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowLeft,
  Bell,
  Play,
  CheckCircle2,
  Lock,
  Smartphone,
  Award,
  Heart,
  Timer,
  BookOpen,
  Send,
  Sliders,
  CheckCircle,
  HelpCircle,
  Activity
} from "lucide-react";

// Interfaces
interface Exercise {
  id: string;
  name: string;
  category: "Pernas" | "Costas" | "Peito" | "Braços" | "Core" | "Cardio / Hyrox";
  defaultSets: number;
  defaultReps: string;
  defaultWeight: number; // in kg
}

interface WorkoutItem {
  id: string;
  exerciseId: string;
  sets: number;
  reps: string;
  weight: number; // in kg
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  items: WorkoutItem[];
}

interface PhysicalEvaluation {
  id: string;
  date: string;
  weight: number; // kg
  fatPercent: number; // %
  musclePercent: number; // %
  waist: number; // cm
  hip: number; // cm
  notes?: string;
}

interface PaymentLog {
  month: string; // e.g. "Julho/2026"
  amount: number;
  status: "pago" | "pendente" | "atrasado";
  payDate?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  goal: "Hipertrofia" | "Emagrecimento" | "Condicionamento / Hyrox" | "Força / Reabilitação";
  level: "Iniciante" | "Intermediário" | "Avançado";
  monthlyFee: number;
  status: "ativo" | "inativo";
  workouts: Workout[];
  evaluations: PhysicalEvaluation[];
  payments: PaymentLog[];
}

interface CompletedWorkoutLog {
  id: string;
  studentId: string;
  date: string;
  workoutName: string;
  durationMinutes: number;
  completedExercisesCount: number;
  satisfaction: number; // 1 to 5
  notes?: string;
}

export default function LBTrainer({ onBack }: { onBack?: () => void }) {
  // Portal Selection State: "trainer" or "student"
  const [activePortal, setActivePortal] = useState<"trainer" | "student">("trainer");
  
  // Trainer active tab
  const [trainerTab, setTrainerTab] = useState<"dashboard" | "students" | "exercises" | "payments" | "future">("dashboard");
  
  // Student active tab
  const [studentTab, setStudentTab] = useState<"workouts" | "history" | "evolution" | "notifs">("workouts");

  // Selection states for admin management
  const [selectedStudentId, setSelectedStudentId] = useState<string>("pedro-henrique");
  
  // Simulated student viewing their app
  const [studentViewId, setStudentViewId] = useState<string>("pedro-henrique");

  // Active workout runner state for student
  const [activeRunningWorkout, setActiveRunningWorkout] = useState<Workout | null>(null);
  const [runningWorkoutProgress, setRunningWorkoutProgress] = useState<Record<string, { weight: number; reps: string; done: boolean[] }>>({});
  const [runningWorkoutStartTime, setRunningWorkoutStartTime] = useState<number | null>(null);
  const [runningWorkoutNotes, setRunningWorkoutNotes] = useState("");

  // Quick Notification Toast
  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Base Exercise Library
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const cached = localStorage.getItem("lb_exercises");
    if (cached) return JSON.parse(cached);
    return [
      { id: "ex-1", name: "Agachamento Livre (Back Squat)", category: "Pernas", defaultSets: 4, defaultReps: "8-10", defaultWeight: 80 },
      { id: "ex-2", name: "Leg Press 45º", category: "Pernas", defaultSets: 4, defaultReps: "12", defaultWeight: 160 },
      { id: "ex-3", name: "Cadeira Extensora", category: "Pernas", defaultSets: 3, defaultReps: "15 (Pico 2s)", defaultWeight: 45 },
      { id: "ex-4", name: "Stiff", category: "Pernas", defaultSets: 4, defaultReps: "10", defaultWeight: 60 },
      { id: "ex-5", name: "Supino Reto com Barra", category: "Peito", defaultSets: 4, defaultReps: "8", defaultWeight: 70 },
      { id: "ex-6", name: "Crucifixo Inclinado com Halteres", category: "Peito", defaultSets: 3, defaultReps: "12", defaultWeight: 22 },
      { id: "ex-7", name: "Puxada Aberta na Polia", category: "Costas", defaultSets: 4, defaultReps: "10-12", defaultWeight: 55 },
      { id: "ex-8", name: "Remada Curvada com Barra", category: "Costas", defaultSets: 4, defaultReps: "8", defaultWeight: 50 },
      { id: "ex-9", name: "Rosca Direta Bilateral com Barra W", category: "Braços", defaultSets: 3, defaultReps: "10", defaultWeight: 25 },
      { id: "ex-10", name: "Tríceps Pulley (Corda)", category: "Braços", defaultSets: 3, defaultReps: "12", defaultWeight: 20 },
      { id: "ex-11", name: "Prancha Abdominal Isométrica", category: "Core", defaultSets: 3, defaultReps: "45 seg", defaultWeight: 0 },
      { id: "ex-12", name: "Hyrox Wall Balls (9kg)", category: "Cardio / Hyrox", defaultSets: 3, defaultReps: "25", defaultWeight: 9 },
      { id: "ex-13", name: "Sled Push (Trenó de Cargas)", category: "Cardio / Hyrox", defaultSets: 4, defaultReps: "20 metros", defaultWeight: 120 },
      { id: "ex-14", name: "Corrida Intervalada (Sprints)", category: "Cardio / Hyrox", defaultSets: 5, defaultReps: "400m / Desc 1'", defaultWeight: 0 }
    ];
  });

  // Students Database
  const [students, setStudents] = useState<Student[]>(() => {
    const cached = localStorage.getItem("lb_students");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "pedro-henrique",
        name: "Pedro Henrique Silva",
        email: "pedrinho.s@gmail.com",
        phone: "(11) 98765-4321",
        goal: "Hipertrofia",
        level: "Avançado",
        monthlyFee: 350,
        status: "ativo",
        workouts: [
          {
            id: "work-pedro-1",
            name: "Treino A: Quadríceps & Peito",
            description: "Foco em força máxima e cadência controlada.",
            items: [
              { id: "item-p1-1", exerciseId: "ex-1", sets: 4, reps: "8", weight: 90, notes: "Cadência 3010 - Aquecer bem" },
              { id: "item-p1-2", exerciseId: "ex-2", sets: 4, reps: "10", weight: 180, notes: "Foco em máxima amplitude" },
              { id: "item-p1-3", exerciseId: "ex-5", sets: 4, reps: "8", weight: 75, notes: "Sem ajuda na subida" },
              { id: "item-p1-4", exerciseId: "ex-6", sets: 3, reps: "12", weight: 24, notes: "Alongamento profundo no pico" }
            ]
          },
          {
            id: "work-pedro-2",
            name: "Treino B: Costas, Braços & Core",
            description: "Estímulo de dorsal densa e picos de bíceps.",
            items: [
              { id: "item-p2-1", exerciseId: "ex-7", sets: 4, reps: "12", weight: 60, notes: "Puxar com o cotovelo" },
              { id: "item-p2-2", exerciseId: "ex-8", sets: 4, reps: "8", weight: 55 },
              { id: "item-p2-3", exerciseId: "ex-9", sets: 3, reps: "10", weight: 28 },
              { id: "item-p2-4", exerciseId: "ex-11", sets: 3, reps: "1 min", weight: 0 }
            ]
          }
        ],
        evaluations: [
          { id: "eval-p-1", date: "2026-04-15", weight: 81.2, fatPercent: 16.5, musclePercent: 41.2, waist: 84, hip: 98, notes: "Avaliação inicial de retorno." },
          { id: "eval-p-2", date: "2026-05-20", weight: 82.5, fatPercent: 15.0, musclePercent: 42.5, waist: 82, hip: 97, notes: "Excelente ganho de massa magra e redução de abdômen." },
          { id: "eval-p-3", date: "2026-06-25", weight: 83.1, fatPercent: 13.8, musclePercent: 43.4, waist: 80, hip: 97, notes: "Estética muito melhorada. Próximo ciclo focar em posterior." }
        ],
        payments: [
          { month: "Maio/2026", amount: 350, status: "pago", payDate: "2026-05-05" },
          { month: "Junho/2026", amount: 350, status: "pago", payDate: "2026-06-03" },
          { month: "Julho/2026", amount: 350, status: "pago", payDate: "2026-07-02" }
        ]
      },
      {
        id: "camila-souza",
        name: "Camila Souza",
        email: "camila.hyrox@outlook.com",
        phone: "(11) 91234-5678",
        goal: "Condicionamento / Hyrox",
        level: "Intermediário",
        monthlyFee: 400,
        status: "ativo",
        workouts: [
          {
            id: "work-cam-1",
            name: "Treino Hyrox Absoluto",
            description: "Condicionamento híbrido para endurance muscular de alta intensidade.",
            items: [
              { id: "item-c1-1", exerciseId: "ex-12", sets: 4, reps: "30 reps", weight: 9, notes: "Padrão de competição Hyrox" },
              { id: "item-c1-2", exerciseId: "ex-13", sets: 3, reps: "40 metros", weight: 100, notes: "Ritmo constante, empurrar firme" },
              { id: "item-c1-3", exerciseId: "ex-14", sets: 4, reps: "800m / Ritmo", weight: 0, notes: "Manter pace abaixo de 4'30\"" }
            ]
          }
        ],
        evaluations: [
          { id: "eval-c-1", date: "2026-05-10", weight: 64.0, fatPercent: 22.1, musclePercent: 32.8, waist: 71, hip: 95, notes: "Excelente capacidade cardiorrespiratória." },
          { id: "eval-c-2", date: "2026-06-12", weight: 62.8, fatPercent: 20.4, musclePercent: 33.6, waist: 68, hip: 94, notes: "Perda saudável de gordura. Aumentou potência no agachamento." }
        ],
        payments: [
          { month: "Maio/2026", amount: 400, status: "pago", payDate: "2026-05-10" },
          { month: "Junho/2026", amount: 400, status: "pago", payDate: "2026-06-11" },
          { month: "Julho/2026", amount: 400, status: "pago", payDate: "2026-07-10" }
        ]
      },
      {
        id: "mariana-costa",
        name: "Mariana Costa",
        email: "mari.costa@yahoo.com.br",
        phone: "(11) 97777-6666",
        goal: "Emagrecimento",
        level: "Iniciante",
        monthlyFee: 350,
        status: "ativo",
        workouts: [
          {
            id: "work-mari-1",
            name: "Treino A: Geral Adaptativo",
            description: "Adaptação de força funcional geral e queima calórica.",
            items: [
              { id: "item-m1-1", exerciseId: "ex-3", sets: 3, reps: "15", weight: 20 },
              { id: "item-m1-2", exerciseId: "ex-7", sets: 3, reps: "12", weight: 25 },
              { id: "item-m1-3", exerciseId: "ex-10", sets: 3, reps: "15", weight: 10 },
              { id: "item-m1-4", exerciseId: "ex-11", sets: 3, reps: "30 seg", weight: 0 }
            ]
          }
        ],
        evaluations: [
          { id: "eval-m-1", date: "2026-06-01", weight: 79.5, fatPercent: 34.2, musclePercent: 26.5, waist: 89, hip: 112, notes: "Foco em aderência inicial aos treinos semanais." },
          { id: "eval-m-2", date: "2026-07-02", weight: 77.1, fatPercent: 32.5, musclePercent: 27.2, waist: 85, hip: 109, notes: "Fantástica evolução em 1 mês! 2.4kg eliminados." }
        ],
        payments: [
          { month: "Junho/2026", amount: 350, status: "pago", payDate: "2026-06-02" },
          { month: "Julho/2026", amount: 350, status: "pago", payDate: "2026-07-03" }
        ]
      }
    ];
  });

  // Completed Training logs (global)
  const [completedLogs, setCompletedLogs] = useState<CompletedWorkoutLog[]>(() => {
    const cached = localStorage.getItem("lb_completed_logs");
    if (cached) return JSON.parse(cached);
    return [
      { id: "log-1", studentId: "pedro-henrique", date: "22/07/2026", workoutName: "Treino A: Quadríceps & Peito", durationMinutes: 52, completedExercisesCount: 4, satisfaction: 5, notes: "Senti muita força hoje. Consegui aumentar carga no Leg Press para 200kg!" },
      { id: "log-2", studentId: "pedro-henrique", date: "20/07/2026", workoutName: "Treino B: Costas, Braços & Core", durationMinutes: 45, completedExercisesCount: 4, satisfaction: 4, notes: "Bom treino. Dor de cabeça leve no final." },
      { id: "log-3", studentId: "camila-souza", date: "21/07/2026", workoutName: "Treino Hyrox Absoluto", durationMinutes: 65, completedExercisesCount: 3, satisfaction: 5, notes: "Melhor tempo de sprint hoje. Wallballs feitas ininterruptamente!" },
      { id: "log-4", studentId: "mariana-costa", date: "21/07/2026", workoutName: "Treino A: Geral Adaptativo", durationMinutes: 40, completedExercisesCount: 4, satisfaction: 4, notes: "Adaptação excelente aos exercícios de costas." }
    ];
  });

  // Notifications state
  const [notifications, setNotifications] = useState<{ id: string; studentId: string; title: string; body: string; date: string; read: boolean }[]>([
    { id: "n-1", studentId: "pedro-henrique", title: "Avaliação Física Atualizada", body: "LB Trainer atualizou seus dados corporais com ganho notável de massa magra!", date: "25/06/2026", read: false },
    { id: "n-2", studentId: "pedro-henrique", title: "Treino Atualizado", body: "Seu treino de pernas e peitoral recebeu ajustes na ordem das séries.", date: "15/07/2026", read: true },
    { id: "n-3", studentId: "camila-souza", title: "Novo Treino Hyrox!", body: "Preparação de alta intensidade liberada. Vamos com tudo!", date: "12/06/2026", read: false }
  ]);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem("lb_exercises", JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem("lb_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("lb_completed_logs", JSON.stringify(completedLogs));
  }, [completedLogs]);

  // Add Exercise Form state
  const [newExerciseForm, setNewExerciseForm] = useState({
    name: "",
    category: "Pernas" as Exercise["category"],
    defaultSets: 4,
    defaultReps: "10-12",
    defaultWeight: 20
  });

  // Add Student Form state
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "Hipertrofia" as Student["goal"],
    level: "Iniciante" as Student["level"],
    monthlyFee: 350
  });

  // Add Physical Evaluation Form state
  const [newEvalForm, setNewEvalForm] = useState({
    weight: "",
    fatPercent: "",
    musclePercent: "",
    waist: "",
    hip: "",
    notes: ""
  });

  // Custom Workout builder states
  const [editingWorkout, setEditingWorkout] = useState<{ studentId: string; workoutId?: string; name: string; description: string; items: WorkoutItem[] } | null>(null);

  // Active student for Personal view
  const currentStudent = useMemo(() => {
    return students.find(s => s.id === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  // Active student for Student portal view
  const activeStudentInPortal = useMemo(() => {
    return students.find(s => s.id === studentViewId) || students[0];
  }, [students, studentViewId]);

  // Handle adding new exercise
  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExerciseForm.name.trim()) return;
    const newEx: Exercise = {
      id: "ex-" + (exercises.length + 1) + "-" + Date.now().toString().slice(-4),
      name: newExerciseForm.name,
      category: newExerciseForm.category,
      defaultSets: Number(newExerciseForm.defaultSets) || 4,
      defaultReps: newExerciseForm.defaultReps || "10",
      defaultWeight: Number(newExerciseForm.defaultWeight) || 0
    };
    setExercises([...exercises, newEx]);
    setNewExerciseForm({ name: "", category: "Pernas", defaultSets: 4, defaultReps: "10-12", defaultWeight: 20 });
    triggerToast("Exercício adicionado à biblioteca!");
  };

  // Handle adding new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name.trim()) return;
    const newId = newStudentForm.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-3);
    const newStudent: Student = {
      id: newId,
      name: newStudentForm.name,
      email: newStudentForm.email || `${newId}@lbtrainer.com`,
      phone: newStudentForm.phone || "(11) 99999-9999",
      goal: newStudentForm.goal,
      level: newStudentForm.level,
      monthlyFee: Number(newStudentForm.monthlyFee) || 350,
      status: "ativo",
      workouts: [],
      evaluations: [
        {
          id: "eval-" + Date.now(),
          date: new Date().toISOString().split("T")[0],
          weight: 75,
          fatPercent: 20,
          musclePercent: 32,
          waist: 80,
          hip: 95,
          notes: "Registro inicial de cadastro."
        }
      ],
      payments: [
        { month: "Julho/2026", amount: Number(newStudentForm.monthlyFee) || 350, status: "pendente" }
      ]
    };
    setStudents([...students, newStudent]);
    setSelectedStudentId(newStudent.id);
    setStudentViewId(newStudent.id);
    setNewStudentForm({ name: "", email: "", phone: "", goal: "Hipertrofia", level: "Iniciante", monthlyFee: 350 });
    triggerToast(`Aluno ${newStudent.name} cadastrado!`);
  };

  // Handle adding physical evaluation
  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvalForm.weight || !newEvalForm.fatPercent) {
      triggerToast("Por favor insira Peso e % de Gordura.");
      return;
    }
    const newEval: PhysicalEvaluation = {
      id: "eval-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      weight: parseFloat(newEvalForm.weight),
      fatPercent: parseFloat(newEvalForm.fatPercent),
      musclePercent: parseFloat(newEvalForm.musclePercent) || 30,
      waist: parseFloat(newEvalForm.waist) || 0,
      hip: parseFloat(newEvalForm.hip) || 0,
      notes: newEvalForm.notes
    };

    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudentId) {
        return {
          ...s,
          evaluations: [...s.evaluations, newEval]
        };
      }
      return s;
    }));

    // Send an automatic notification about this update
    setNotifications(prev => [
      {
        id: "n-" + Date.now(),
        studentId: selectedStudentId,
        title: "Nova Avaliação Física Disponível!",
        body: `LB Trainer registrou seus dados em ${newEval.date}. Confira os gráficos de evolução!`,
        date: new Date().toLocaleDateString("pt-BR"),
        read: false
      },
      ...prev
    ]);

    setNewEvalForm({ weight: "", fatPercent: "", musclePercent: "", waist: "", hip: "", notes: "" });
    triggerToast("Avaliação física salva e enviada ao aluno!");
  };

  // Quick helper to fetch exercise name
  const getExerciseName = (exId: string) => {
    return exercises.find(e => e.id === exId)?.name || "Exercício Removido";
  };

  // Start designing a workout for the current student
  const startNewWorkoutEditing = () => {
    setEditingWorkout({
      studentId: selectedStudentId,
      name: "Novo Treino Personalizado",
      description: "Instruções específicas para execução.",
      items: []
    });
  };

  // Save the currently edited workout to student
  const saveEditedWorkout = () => {
    if (!editingWorkout) return;
    if (editingWorkout.items.length === 0) {
      triggerToast("Adicione pelo menos um exercício ao treino!");
      return;
    }

    setStudents(prev => prev.map(s => {
      if (s.id === editingWorkout.studentId) {
        const workoutsCopy = [...s.workouts];
        if (editingWorkout.workoutId) {
          // Edit existing
          const idx = workoutsCopy.findIndex(w => w.id === editingWorkout.workoutId);
          if (idx !== -1) {
            workoutsCopy[idx] = {
              id: editingWorkout.workoutId,
              name: editingWorkout.name,
              description: editingWorkout.description,
              items: editingWorkout.items
            };
          }
        } else {
          // Create new
          workoutsCopy.push({
            id: "work-" + Date.now(),
            name: editingWorkout.name,
            description: editingWorkout.description,
            items: editingWorkout.items
          });
        }
        return { ...s, workouts: workoutsCopy };
      }
      return s;
    }));

    // Send notification
    setNotifications(prev => [
      {
        id: "n-" + Date.now(),
        studentId: editingWorkout.studentId,
        title: "Roteiro de Treinos Atualizado",
        body: `LB Trainer atualizou ou incluiu o treino: "${editingWorkout.name}".`,
        date: new Date().toLocaleDateString("pt-BR"),
        read: false
      },
      ...prev
    ]);

    setEditingWorkout(null);
    triggerToast("Plano de treinamento salvo com sucesso!");
  };

  // Delete workout
  const handleDeleteWorkout = (studentId: string, workoutId: string) => {
    if (!confirm("Tem certeza que deseja remover este treino?")) return;
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          workouts: s.workouts.filter(w => w.id !== workoutId)
        };
      }
      return s;
    }));
    triggerToast("Treino removido.");
  };

  // Toggle payment status
  const handleTogglePayment = (studentId: string, payMonth: string, currentStatus: PaymentLog["status"]) => {
    const nextStatusMap: Record<PaymentLog["status"], PaymentLog["status"]> = {
      "pago": "pendente",
      "pendente": "atrasado",
      "atrasado": "pago"
    };
    const nextStatus = nextStatusMap[currentStatus];

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          payments: s.payments.map(p => {
            if (p.month === payMonth) {
              return {
                ...p,
                status: nextStatus,
                payDate: nextStatus === "pago" ? new Date().toISOString().split("T")[0] : undefined
              };
            }
            return p;
          })
        };
      }
      return s;
    }));
    triggerToast(`Status do pagamento alterado para: ${nextStatus.toUpperCase()}`);
  };

  // Student runner trigger
  const handleStartWorkoutSession = (workout: Workout) => {
    setActiveRunningWorkout(workout);
    setRunningWorkoutStartTime(Date.now());
    setRunningWorkoutNotes("");
    
    // Initial progress tracker
    const progress: Record<string, { weight: number; reps: string; done: boolean[] }> = {};
    workout.items.forEach(item => {
      progress[item.id] = {
        weight: item.weight,
        reps: item.reps,
        done: Array(item.sets).fill(false)
      };
    });
    setRunningWorkoutProgress(progress);
    triggerToast("Iniciando treino! Marque as séries concluídas.");
  };

  // Save/Complete student workout session
  const handleCompleteWorkoutSession = () => {
    if (!activeRunningWorkout || !runningWorkoutStartTime) return;
    
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - runningWorkoutStartTime) / 60000));
    
    // Count how many exercises had at least one checked set
    let completedExCount = 0;
    Object.values(runningWorkoutProgress).forEach((item: any) => {
      if (item.done && item.done.some((d: boolean) => d)) completedExCount++;
    });

    const newLog: CompletedWorkoutLog = {
      id: "log-" + Date.now(),
      studentId: studentViewId,
      date: new Date().toLocaleDateString("pt-BR"),
      workoutName: activeRunningWorkout.name,
      durationMinutes: elapsedMinutes,
      completedExercisesCount: completedExCount || activeRunningWorkout.items.length,
      satisfaction: 5, // Default good satisfaction
      notes: runningWorkoutNotes.trim() || "Treino concluído com foco e consistência!"
    };

    setCompletedLogs(prev => [newLog, ...prev]);
    setActiveRunningWorkout(null);
    triggerToast("Parabéns! Registro de treino salvo com sucesso.");
    setStudentTab("history");
  };

  // AI workout suggestions simulation generator (the feature that links to the rising AI trend)
  const [aiGenerating, setAiGenerating] = useState(false);
  const handleGenerateAiWorkout = () => {
    setAiGenerating(true);
    triggerToast("Invocando assistente inteligente LB Trainer...");
    setTimeout(() => {
      if (!editingWorkout) return;
      
      // Determine exercises matching student goal
      let selectedIds: string[] = [];
      if (currentStudent.goal === "Condicionamento / Hyrox") {
        selectedIds = ["ex-12", "ex-13", "ex-14", "ex-1"];
      } else if (currentStudent.goal === "Hipertrofia") {
        selectedIds = ["ex-1", "ex-5", "ex-7", "ex-9"];
      } else {
        selectedIds = ["ex-3", "ex-7", "ex-11", "ex-10"];
      }

      const generatedItems: WorkoutItem[] = selectedIds.map((exId, idx) => ({
        id: "item-ai-" + idx + "-" + Date.now(),
        exerciseId: exId,
        sets: 4,
        reps: "10-12 reps controladas",
        weight: exercises.find(e => e.id === exId)?.defaultWeight || 15,
        notes: "Sugestão IA: Manter amplitude ótima."
      }));

      setEditingWorkout(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: `Treino IA: Otimizado para ${currentStudent.goal}`,
          description: `Roteiro gerado pela IA da LB Trainer focado no nível ${currentStudent.level} de ${currentStudent.name}.`,
          items: [...prev.items, ...generatedItems]
        };
      });

      setAiGenerating(false);
      triggerToast("Roteiro IA inserido na montagem de treinos!");
    }, 1500);
  };

  // Compute stats for trainer dashboard
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const activeOnes = students.filter(s => s.status === "ativo").length;
    
    // Revenue calculations
    let expectedRevenue = 0;
    let receivedRevenue = 0;
    let pendingRevenue = 0;

    students.forEach(s => {
      expectedRevenue += s.monthlyFee;
      const thisMonthPayment = s.payments.find(p => p.month === "Julho/2026");
      if (thisMonthPayment) {
        if (thisMonthPayment.status === "pago") {
          receivedRevenue += s.monthlyFee;
        } else {
          pendingRevenue += s.monthlyFee;
        }
      } else {
        pendingRevenue += s.monthlyFee;
      }
    });

    const totalWorkouts = students.reduce((acc, s) => acc + s.workouts.length, 0);
    const recentLogsCount = completedLogs.length;

    return {
      totalStudents,
      activeOnes,
      expectedRevenue,
      receivedRevenue,
      pendingRevenue,
      totalWorkouts,
      recentLogsCount
    };
  }, [students, completedLogs]);

  return (
    <div className="min-h-screen bg-[#06080F] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0C1530] via-[#06080F] to-[#030408] text-[#F3F4F6] font-sans antialiased overflow-x-hidden selection:bg-[#CCFF00] selection:text-[#0E1015]">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#CCFF00] text-[#0E1015] px-6 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(204,255,0,0.2)] border border-lime-400 flex items-center gap-3 text-xs font-bold uppercase tracking-wider font-mono"
          >
            <span className="w-2.5 h-2.5 bg-[#0E1015] rounded-full animate-ping shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Sports-Tech Upper Bar with Glassmorphic design */}
      <header className="border-b border-white/[0.08] bg-[#0E121E]/80 sticky top-0 z-40 px-6 py-4.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo & Back Button */}
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-3 rounded-xl border border-white/[0.08] hover:border-[#CCFF00] text-gray-400 hover:text-white transition-all flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08]"
                title="Voltar ao Portfólio"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#CCFF00] text-[#0E1015] text-[9px] font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase">
                  Fitness Tech SaaS
                </span>
                <span className="text-gray-500 font-mono text-[10px] tracking-wider">// LATAM ELITE ATHLETE HUB</span>
              </div>
              <h1 className="text-2xl font-serif font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                LB <span className="text-[#CCFF00] font-sans font-light">Trainer</span>
              </h1>
            </div>
          </div>

          {/* Quick Sandbox Portal Toggle (Trainer View vs Student View) */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] shadow-2xl">
            <button
              onClick={() => {
                setActivePortal("trainer");
                triggerToast("Acesso Personal: Workbench Ativo");
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                activePortal === "trainer"
                  ? "bg-[#CCFF00] text-[#0E1015] shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Painel do Personal</span>
            </button>
            <button
              onClick={() => {
                setActivePortal("student");
                triggerToast("Acesso Aluno: Simulando App");
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                activePortal === "student"
                  ? "bg-[#CCFF00] text-[#0E1015] shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Área do Aluno</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ========================================================
            PORTAL 1: PERSONAL TRAINER CONTROL WORKBENCH
            ======================================================== */}
        {activePortal === "trainer" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Context/Overview Box with Modern High-End Styling */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0F1426] to-[#141C33] border border-white/[0.08] rounded-3xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-2xl">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="space-y-3 relative z-10 text-left">
                <div className="inline-flex items-center space-x-2 text-xs text-[#CCFF00] uppercase font-mono font-bold tracking-widest bg-lime-950/40 px-3 py-1.5 rounded-lg border border-lime-400/20">
                  <Sliders className="h-3.5 w-3.5 animate-pulse" />
                  <span>Personal Trainer Intelligence Center</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white leading-tight">
                  Gestão Esportiva de <span className="text-[#CCFF00]">Alto Rendimento</span>
                </h2>
                <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                  Sistema inteligente e unificado para personal trainers. Controle fichas de alunos, planeje treinos com o <strong>Assistente de IA</strong>, lance métricas antropométricas e acompanhe o fluxo de caixa consolidado.
                </p>
              </div>

              <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/[0.08] p-5 rounded-2xl text-center flex-shrink-0 flex flex-col justify-center min-w-[220px] shadow-lg">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Faturamento Julho/2026</span>
                <span className="text-2xl font-black text-white mt-1.5">R$ {stats.expectedRevenue.toLocaleString("pt-BR")},00</span>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[10px] text-emerald-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ADIMPLÊNCIA: {((stats.receivedRevenue / stats.expectedRevenue) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Sub-Navigation for Trainer (Sports HUD Look) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-0">
              {[
                { id: "dashboard", label: "Indicadores Gerais", icon: TrendingUp },
                { id: "students", label: "Fichas de Alunos", icon: Users },
                { id: "exercises", label: "Biblioteca de Exercícios", icon: Dumbbell },
                { id: "payments", label: "Controle Financeiro", icon: DollarSign },
                { id: "future", label: "Diferencial & Visão de Futuro", icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTrainerTab(tab.id as any)}
                    className={`px-5 py-3 rounded-t-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 border-b-2 cursor-pointer ${
                      trainerTab === tab.id
                        ? "border-[#CCFF00] bg-white/[0.03] text-white font-black"
                        : "border-transparent text-gray-400 hover:text-white hover:bg-white/[0.01]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: DASHBOARD */}
            {trainerTab === "dashboard" && (
              <div className="space-y-8 animate-fade-in">
                
                {/* 4 Premium Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Card 1 */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl hover:border-lime-500/20 transition-all group duration-300">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="text-[11px] uppercase font-mono tracking-wider font-bold">Alunos Ativos</span>
                      <div className="p-2 bg-white/[0.04] rounded-lg text-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-colors">
                        <Users className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-serif font-black text-white">{stats.activeOnes}</span>
                      <span className="text-xs text-gray-400">/ {stats.totalStudents} total</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-lime-500 to-[#CCFF00] h-full transition-all duration-500" style={{ width: `${(stats.activeOnes / stats.totalStudents) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono block text-left">Taxa de Atividade: {((stats.activeOnes / stats.totalStudents) * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/20 transition-all group duration-300">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="text-[11px] uppercase font-mono tracking-wider font-bold">Faturamento Recebido</span>
                      <div className="p-2 bg-white/[0.04] rounded-lg text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                        <DollarSign className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-serif font-black text-emerald-400">R$ {stats.receivedRevenue}</span>
                      <span className="text-xs text-gray-400">de R$ {stats.expectedRevenue}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${(stats.receivedRevenue / stats.expectedRevenue) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono block text-left">Falta receber: R$ {stats.pendingRevenue}</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl hover:border-cyan-500/20 transition-all group duration-300">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="text-[11px] uppercase font-mono tracking-wider font-bold">Roteiros Prescritos</span>
                      <div className="p-2 bg-white/[0.04] rounded-lg text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                        <Dumbbell className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-serif font-black text-white">{stats.totalWorkouts}</span>
                      <span className="text-xs text-gray-400">fichas ativas</span>
                    </div>
                    <div className="space-y-1 text-[10px] text-gray-400 font-mono text-left pt-2 border-t border-white/[0.04]">
                      <span>Média de {(stats.totalWorkouts / stats.totalStudents).toFixed(1)} planos de treino por aluno</span>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 space-y-4 shadow-xl hover:border-lime-500/20 transition-all group duration-300">
                    <div className="flex justify-between items-center text-gray-400">
                      <span className="text-[11px] uppercase font-mono tracking-wider font-bold">Sessões Concluídas</span>
                      <div className="p-2 bg-white/[0.04] rounded-lg text-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-colors">
                        <Clipboard className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-serif font-black text-white">{stats.recentLogsCount}</span>
                      <span className="text-xs text-gray-400">registros totais</span>
                    </div>
                    <div className="space-y-1 text-[10px] text-emerald-400 font-mono text-left pt-2 border-t border-white/[0.04] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Alunos com alta constância este mês</span>
                    </div>
                  </div>

                </div>

                {/* Main Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Fast Action - Registered Students List */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-6 lg:col-span-2 shadow-2xl">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#CCFF00]" />
                          Alunos & Fichas Rápidas
                        </h3>
                        <p className="text-[11px] text-gray-400">Selecione o aluno ativo para visualizar e editar seu plano de treino</p>
                      </div>
                      <button 
                        onClick={() => setTrainerTab("students")} 
                        className="text-[#CCFF00] hover:text-white text-xs flex items-center space-x-1 bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 transition-all px-3 py-1.5 rounded-lg border border-lime-400/20 font-mono font-bold"
                      >
                        <span>Gerenciar</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {students.map((student) => {
                        const lastEval = student.evaluations[student.evaluations.length - 1];
                        const isSelected = selectedStudentId === student.id;
                        
                        // Pick beautiful initial color based on name length
                        const colors = ["bg-lime-500/20 text-lime-400 border-lime-500/30", "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", "bg-amber-500/20 text-amber-400 border-amber-500/30"];
                        const colorIdx = student.name.length % colors.length;
                        const initial = student.name.slice(0, 2).toUpperCase();

                        return (
                          <div 
                            key={student.id}
                            className={`p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between relative group ${
                              isSelected 
                                ? "bg-gradient-to-br from-[#121935] to-[#0A0D1A] border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.1)]" 
                                : "bg-black/30 border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.02]"
                            }`}
                            onClick={() => {
                              setSelectedStudentId(student.id);
                              triggerToast(`Ativo: ${student.name}`);
                            }}
                          >
                            {isSelected && (
                              <span className="absolute top-4.5 right-4.5 h-2 w-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
                            )}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className={`h-10 w-10 rounded-xl border flex items-center justify-center font-bold font-mono text-sm ${colors[colorIdx]}`}>
                                  {initial}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="font-bold text-white text-sm block tracking-tight group-hover:text-[#CCFF00] transition-colors">{student.name}</span>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#CCFF00]/10 text-[#CCFF00] font-mono font-bold uppercase">
                                      {student.goal}
                                    </span>
                                    <span className="text-[9px] text-gray-400 font-mono">
                                      {student.level}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed font-mono">
                                Prescritos: <strong>{student.workouts.length} fichas</strong> • Status: 
                                <span className="text-emerald-400 ml-1">Ativo</span>
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/[0.04] flex justify-between items-center text-[11px] text-gray-500 font-mono">
                              <span>Métrica Recente:</span>
                              <span className="font-bold text-white">
                                {lastEval ? `${lastEval.weight}kg (${lastEval.fatPercent}% BF)` : "Nenhuma registrada"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Link to Student portal simulator */}
                    <div className="bg-gradient-to-r from-lime-950/20 via-[#0E1325]/50 to-[#121935]/40 border border-dashed border-[#CCFF00]/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-[40px] pointer-events-none" />
                      <div className="space-y-1 relative z-10">
                        <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-[#CCFF00] flex items-center gap-2">
                          <Smartphone className="h-4 w-4 animate-bounce" />
                          Simulador de Aplicativo do Aluno
                        </h4>
                        <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                          Visualização mobile de alto rendimento. Veja a rotina exatamente como seu aluno visualiza no smartphone durante o treinamento no salão.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setStudentViewId(selectedStudentId);
                          setActivePortal("student");
                          triggerToast(`Simulando: ${students.find(s => s.id === selectedStudentId)?.name}`);
                        }} 
                        className="bg-[#CCFF00] text-[#0E1015] hover:bg-lime-400 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center space-x-2 font-mono shadow-[0_4px_12px_rgba(204,255,0,0.2)] transition-all cursor-pointer shrink-0"
                      >
                        <span>Entrar no App</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Recent Workout Sessions completed */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-6 shadow-2xl text-left flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white flex items-center gap-2">
                        <Activity className="h-4 w-4 text-cyan-400" />
                        Histórico de Atividade
                      </h3>
                      <p className="text-[11px] text-gray-400">Notificações em tempo real do salão</p>
                    </div>

                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 flex-1 mt-4 scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent">
                      {completedLogs.map((log) => {
                        const studentName = students.find(s => s.id === log.studentId)?.name || "Aluno";
                        return (
                          <div key={log.id} className="bg-black/20 border border-white/[0.04] hover:border-white/[0.1] rounded-xl p-3.5 space-y-2.5 transition-all">
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-0.5">
                                <span className="font-bold text-xs text-white block leading-tight">{studentName}</span>
                                <span className="text-[10px] text-gray-400 block font-mono">{log.workoutName}</span>
                              </div>
                              <span className="text-[9px] text-[#CCFF00] font-mono tracking-wider bg-lime-950/40 border border-lime-400/20 px-2 py-0.5 rounded-md shrink-0">
                                {log.date}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-300 italic bg-white/[0.02] p-2 rounded-lg border border-white/[0.02]">
                              "{log.notes}"
                            </p>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1.5 border-t border-white/[0.04]">
                              <span className="flex items-center gap-1"><Timer className="h-3 w-3 text-cyan-400" /> {log.durationMinutes} min</span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: log.satisfaction || 5 }).map((_, i) => (
                                  <Sparkles key={i} className="h-2.5 w-2.5 text-[#CCFF00] fill-[#CCFF00]" />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB CONTENT: STUDENTS */}
            {trainerTab === "students" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                
                {/* Left side: Student selector & creation */}
                <div className="space-y-6">
                  
                  {/* Create New Student form */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-5 shadow-2xl">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-[#CCFF00]/10 text-[#CCFF00] rounded-xl">
                        <Plus className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white">
                        Matricular Novo Aluno
                      </h3>
                    </div>
                    
                    <form onSubmit={handleAddStudent} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Nome Completo</label>
                        <input
                          type="text"
                          required
                          value={newStudentForm.name}
                          onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all font-sans"
                          placeholder="Ex: Rafael Castro"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">E-mail</label>
                          <input
                            type="email"
                            value={newStudentForm.email}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                            className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3 py-2.5 text-xs focus:outline-none text-white transition-all font-sans"
                            placeholder="rafael@ex.com"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Telefone</label>
                          <input
                            type="text"
                            value={newStudentForm.phone}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                            className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3 py-2.5 text-xs focus:outline-none text-white transition-all font-sans"
                            placeholder="(11) 98888-7777"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Objetivo</label>
                          <select
                            value={newStudentForm.goal}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, goal: e.target.value as any })}
                            className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-2.5 py-2.5 text-xs focus:outline-none text-white transition-all"
                          >
                            <option value="Hipertrofia">Hipertrofia</option>
                            <option value="Emagrecimento">Emagrecimento</option>
                            <option value="Condicionamento / Hyrox">Endurance / Hyrox</option>
                            <option value="Força / Reabilitação">Força / Reabilitar</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Nível Técnico</label>
                          <select
                            value={newStudentForm.level}
                            onChange={(e) => setNewStudentForm({ ...newStudentForm, level: e.target.value as any })}
                            className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-2.5 py-2.5 text-xs focus:outline-none text-white transition-all"
                          >
                            <option value="Iniciante">Iniciante</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Valor da Mensalidade (R$)</label>
                        <input
                          type="number"
                          value={newStudentForm.monthlyFee}
                          onChange={(e) => setNewStudentForm({ ...newStudentForm, monthlyFee: Number(e.target.value) })}
                          className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all font-mono"
                          placeholder="350"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#CCFF00] hover:bg-lime-400 text-[#0E1015] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center space-x-1.5 mt-4 shadow-[0_4px_12px_rgba(204,255,0,0.15)] cursor-pointer transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        <span>Cadastrar Matrícula</span>
                      </button>
                    </form>
                  </div>

                  {/* List of enrolled students */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-2xl">
                    <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white text-left">Selecionar Aluno</h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent">
                      {students.map((student) => {
                        const isSelected = selectedStudentId === student.id;
                        return (
                          <button
                            key={student.id}
                            onClick={() => {
                              setSelectedStudentId(student.id);
                              setEditingWorkout(null);
                              triggerToast(`Perfil: ${student.name}`);
                            }}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#121935] to-[#0E1325] border-[#CCFF00] shadow-[0_4px_15px_rgba(204,255,0,0.1)]"
                                : "bg-black/30 border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.02]"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-bold text-xs text-white block">{student.name}</span>
                              <span className="text-[10px] text-gray-400 block font-mono">{student.goal} • {student.level}</span>
                            </div>
                            <ChevronRight className={`h-4.5 w-4.5 transition-transform duration-300 ${isSelected ? "text-[#CCFF00] translate-x-1" : "text-gray-500"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right side: Selected student details (Workouts + Phys Evaluation) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Student profile overview with premium styling */}
                  <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 text-left space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#CCFF00]/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.06] pb-5 relative z-10">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-lime-400/20 to-lime-600/20 border border-lime-400/30 flex items-center justify-center text-[#CCFF00] font-mono font-bold text-lg">
                          {currentStudent.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-serif font-black text-white">{currentStudent.name}</h2>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-mono font-bold uppercase tracking-wider">Ativo</span>
                          </div>
                          <p className="text-xs text-gray-400 font-mono">{currentStudent.email} • {currentStudent.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-gray-300">
                          Mensalidade: <strong className="text-[#CCFF00]">R$ {currentStudent.monthlyFee}</strong>
                        </span>
                      </div>
                    </div>

                    {/* TWO SUB-TABS: TREINOS vs AVALIAÇÕES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                      
                      {/* Sub-column 1: Workouts list */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#CCFF00]">Roteiros de Treino</h4>
                          {!editingWorkout && (
                            <button
                              onClick={startNewWorkoutEditing}
                              className="bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] hover:bg-[#CCFF00]/20 text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 rounded-lg flex items-center space-x-1"
                            >
                              <Plus className="h-3 w-3" />
                              <span>Novo Treino</span>
                            </button>
                          )}
                        </div>

                        {/* Workout editor sub-form */}
                        {editingWorkout ? (
                          <div className="bg-[#0E1015] border border-[#CCFF00]/20 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-[#222735]">
                              <span className="text-xs font-mono font-bold text-white">Configurar Exercícios</span>
                              <button onClick={() => setEditingWorkout(null)} className="text-gray-400 hover:text-white">
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase font-mono text-gray-400">Nome do Roteiro</label>
                              <input
                                type="text"
                                value={editingWorkout.name}
                                onChange={(e) => setEditingWorkout({ ...editingWorkout, name: e.target.value })}
                                className="w-full bg-[#121622] border border-[#222735] rounded-lg px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-[10px] uppercase font-mono text-gray-400">Descrição / Foco</label>
                              <textarea
                                value={editingWorkout.description}
                                onChange={(e) => setEditingWorkout({ ...editingWorkout, description: e.target.value })}
                                className="w-full bg-[#121622] border border-[#222735] rounded-lg px-2.5 py-1.5 text-xs text-white h-12"
                              />
                            </div>

                            {/* Added exercises so far */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] uppercase font-mono text-gray-400 block">Exercícios do Treino ({editingWorkout.items.length})</span>
                              
                              <div className="space-y-2 max-h-[150px] overflow-y-auto">
                                {editingWorkout.items.map((item, idx) => (
                                  <div key={item.id} className="bg-[#121622] p-2.5 rounded border border-[#222735] flex justify-between items-center text-xs">
                                    <div className="text-left">
                                      <span className="font-bold text-white block">{getExerciseName(item.exerciseId)}</span>
                                      <span className="text-[10px] text-gray-400">{item.sets}x {item.reps} @ {item.weight}kg</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setEditingWorkout({
                                          ...editingWorkout,
                                          items: editingWorkout.items.filter(i => i.id !== item.id)
                                        });
                                      }}
                                      className="text-red-400 hover:text-red-300 p-1"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Exercises insertion toolbox */}
                            <div className="bg-[#121622] p-3 rounded-lg border border-[#222735] space-y-2">
                              <span className="text-[10px] font-bold text-gray-300 uppercase block font-mono">Pesquisa Rápida da Biblioteca</span>
                              
                              <div className="grid grid-cols-1 gap-1 max-h-[140px] overflow-y-auto">
                                {exercises.slice(0, 7).map((ex) => (
                                  <button
                                    key={ex.id}
                                    type="button"
                                    onClick={() => {
                                      const newItem: WorkoutItem = {
                                        id: "item-" + Date.now() + Math.random().toString().slice(-3),
                                        exerciseId: ex.id,
                                        sets: ex.defaultSets,
                                        reps: ex.defaultReps,
                                        weight: ex.defaultWeight
                                      };
                                      setEditingWorkout({
                                        ...editingWorkout,
                                        items: [...editingWorkout.items, newItem]
                                      });
                                      triggerToast(`Adicionado: ${ex.name}`);
                                    }}
                                    className="text-left px-2 py-1.5 rounded hover:bg-[#1C2132] text-xs text-gray-300 flex justify-between items-center transition-all"
                                  >
                                    <span>{ex.name}</span>
                                    <span className="text-[10px] text-[#CCFF00] font-mono">+ Adicionar</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* AI Trigger inside workout planner */}
                            <div className="flex gap-2">
                              <button
                                onClick={handleGenerateAiWorkout}
                                disabled={aiGenerating}
                                className="flex-1 bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg flex items-center justify-center space-x-1 hover:bg-purple-900/40 transition-colors"
                              >
                                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
                                <span>{aiGenerating ? "IA gerando..." : "Sugerir com IA"}</span>
                              </button>

                              <button
                                onClick={saveEditedWorkout}
                                className="flex-1 bg-[#CCFF00] text-[#0E1015] font-mono text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg flex items-center justify-center space-x-1 hover:bg-lime-400 transition-colors"
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>Salvar Treino</span>
                              </button>
                            </div>

                          </div>
                        ) : (
                          <div className="space-y-2">
                            {currentStudent.workouts.length === 0 ? (
                              <p className="text-xs text-gray-500 italic p-4 bg-[#0E1015] rounded-xl border border-[#222735]">Nenhum treino prescrito para este aluno ainda.</p>
                            ) : (
                              currentStudent.workouts.map((work) => (
                                <div key={work.id} className="bg-[#0E1015] border border-[#222735] p-3.5 rounded-xl text-left space-y-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h5 className="font-bold text-xs text-white">{work.name}</h5>
                                      <p className="text-[10px] text-gray-400">{work.description}</p>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteWorkout(currentStudent.id, work.id)}
                                      className="text-gray-500 hover:text-red-400 p-1"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>

                                  <div className="space-y-1 pt-1.5 border-t border-[#1C2132]">
                                    {work.items.map((item) => (
                                      <div key={item.id} className="flex justify-between text-[11px] text-gray-400">
                                        <span>• {getExerciseName(item.exerciseId)}</span>
                                        <span className="font-mono text-[10px] text-gray-300">{item.sets}x{item.reps} @ {item.weight}kg</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      {/* Sub-column 2: Physical Evaluations */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#CCFF00]">Métricas & Evolução Física</h4>
                        
                        {/* Add evaluation form */}
                        <div className="bg-[#0E1015] border border-[#222735] p-4 rounded-xl space-y-3">
                          <span className="text-[11px] font-bold text-white uppercase font-mono block">Lançar Nova Avaliação</span>
                          
                          <form onSubmit={handleAddEvaluation} className="space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[9px] uppercase font-mono text-gray-400 mb-0.5">Peso (kg)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  required
                                  value={newEvalForm.weight}
                                  onChange={(e) => setNewEvalForm({ ...newEvalForm, weight: e.target.value })}
                                  className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                  placeholder="82.5"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono text-gray-400 mb-0.5">Gordura %</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  required
                                  value={newEvalForm.fatPercent}
                                  onChange={(e) => setNewEvalForm({ ...newEvalForm, fatPercent: e.target.value })}
                                  className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                  placeholder="14.2"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono text-gray-400 mb-0.5">Músculo %</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={newEvalForm.musclePercent}
                                  onChange={(e) => setNewEvalForm({ ...newEvalForm, musclePercent: e.target.value })}
                                  className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                  placeholder="43.1"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] uppercase font-mono text-gray-400 mb-0.5">Cintura (cm)</label>
                                <input
                                  type="number"
                                  value={newEvalForm.waist}
                                  onChange={(e) => setNewEvalForm({ ...newEvalForm, waist: e.target.value })}
                                  className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                  placeholder="80"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono text-gray-400 mb-0.5">Quadril (cm)</label>
                                <input
                                  type="number"
                                  value={newEvalForm.hip}
                                  onChange={(e) => setNewEvalForm({ ...newEvalForm, hip: e.target.value })}
                                  className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                  placeholder="97"
                                />
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                value={newEvalForm.notes}
                                onChange={(e) => setNewEvalForm({ ...newEvalForm, notes: e.target.value })}
                                className="w-full bg-[#121622] border border-[#222735] rounded px-2 py-1 text-xs text-white"
                                placeholder="Observação estética ou metas"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#CCFF00] hover:bg-lime-400 text-[#0E1015] font-mono text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-lg flex items-center justify-center"
                            >
                              <span>Registrar Métricas</span>
                            </button>
                          </form>
                        </div>

                        {/* History of Evaluations */}
                        <div className="space-y-2 max-h-[180px] overflow-y-auto">
                          {currentStudent.evaluations.map((ev, index) => (
                            <div key={ev.id} className="bg-[#0E1015] border border-[#222735] p-3 rounded-lg flex justify-between items-center text-xs">
                              <div className="text-left">
                                <span className="font-bold text-white block">{ev.date}</span>
                                <span className="text-[10px] text-gray-400">Peso: {ev.weight}kg • BF: {ev.fatPercent}% • Músculo: {ev.musclePercent}%</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#CCFF00]">
                                #{index + 1}
                              </span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* TAB CONTENT: EXERCISE LIBRARY */}
            {trainerTab === "exercises" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left animate-fade-in">
                
                {/* Form to add custom exercise */}
                <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-5 shadow-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#CCFF00]/10 text-[#CCFF00] rounded-xl">
                      <Plus className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white">Adicionar à Biblioteca</h3>
                  </div>
                  
                  <form onSubmit={handleAddExercise} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Nome do Movimento</label>
                      <input
                        type="text"
                        required
                        value={newExerciseForm.name}
                        onChange={(e) => setNewExerciseForm({ ...newExerciseForm, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all font-sans"
                        placeholder="Ex: Leg Extension unilateral"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Grupamento / Tipo</label>
                      <select
                        value={newExerciseForm.category}
                        onChange={(e) => setNewExerciseForm({ ...newExerciseForm, category: e.target.value as any })}
                        className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-2.5 py-2.5 text-xs focus:outline-none text-white transition-all"
                      >
                        <option value="Pernas">Pernas</option>
                        <option value="Costas">Costas</option>
                        <option value="Peito">Peito</option>
                        <option value="Braços">Braços</option>
                        <option value="Core">Core</option>
                        <option value="Cardio / Hyrox">Cardio / Hyrox</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Séries Padrão</label>
                        <input
                          type="number"
                          value={newExerciseForm.defaultSets}
                          onChange={(e) => setNewExerciseForm({ ...newExerciseForm, defaultSets: Number(e.target.value) })}
                          className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gray-400 mb-1.5">Carga Padrão (kg)</label>
                        <input
                          type="number"
                          value={newExerciseForm.defaultWeight}
                          onChange={(e) => setNewExerciseForm({ ...newExerciseForm, defaultWeight: Number(e.target.value) })}
                          className="w-full bg-black/40 border border-white/[0.08] focus:border-[#CCFF00] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#CCFF00] hover:bg-lime-400 text-[#0E1015] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-[0_4px_12px_rgba(204,255,0,0.15)] cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Salvar Exercício</span>
                    </button>
                  </form>
                </div>

                {/* Listing exercises library categorized */}
                <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                    <div className="space-y-0.5">
                      <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-white">Biblioteca de Movimentos</h3>
                      <p className="text-[11px] text-gray-400 font-mono">Catalogados no banco de dados ativo</p>
                    </div>
                    <span className="text-xs font-mono bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] text-gray-300">{exercises.length} movimentos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/[0.06] scrollbar-track-transparent">
                    {exercises.map((ex) => {
                      const groupColors: Record<string, string> = {
                        Pernas: "border-lime-500/20 bg-lime-500/[0.01] text-lime-400",
                        Costas: "border-cyan-500/20 bg-cyan-500/[0.01] text-cyan-400",
                        Peito: "border-blue-500/20 bg-blue-500/[0.01] text-blue-400",
                        Braços: "border-amber-500/20 bg-amber-500/[0.01] text-amber-400",
                        Core: "border-purple-500/20 bg-purple-500/[0.01] text-purple-400",
                        "Cardio / Hyrox": "border-[#CCFF00]/20 bg-[#CCFF00]/[0.01] text-[#CCFF00]"
                      };
                      const hueClass = groupColors[ex.category] || "border-white/[0.06] text-white";

                      return (
                        <div key={ex.id} className={`p-4 rounded-2xl border flex justify-between items-center transition-all hover:border-white/10 ${hueClass}`}>
                          <div className="space-y-1">
                            <span className="font-bold text-xs text-white block">{ex.name}</span>
                            <span className="text-[10px] text-gray-400 block font-mono">{ex.defaultSets}séries • Carga Inicial: {ex.defaultWeight}kg</span>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white border border-white/[0.06] font-mono uppercase font-bold tracking-wider shrink-0">
                            {ex.category.split(" ")[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: PAYMENTS */}
            {trainerTab === "payments" && (
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 text-left space-y-6 shadow-2xl animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.06] pb-5">
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-[#CCFF00]" />
                      Controle de Mensalidades
                    </h3>
                    <p className="text-xs text-gray-400">Clique no status do mês corrente para realizar cobrança e alternar status do caixa.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2 bg-black/40 border border-white/[0.08] px-3.5 py-2 rounded-xl shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                      <span className="text-gray-300">Recebido: <strong className="text-white">R$ {stats.receivedRevenue}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/[0.08] px-3.5 py-2 rounded-xl shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      <span className="text-gray-300">Pendente: <strong className="text-white">R$ {stats.pendingRevenue}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Financial overview table */}
                <div className="overflow-x-auto border border-white/[0.06] rounded-2xl shadow-xl bg-black/20">
                  <table className="w-full text-xs text-gray-300">
                    <thead className="bg-black/40 text-[10px] font-mono uppercase tracking-wider text-gray-400 border-b border-white/[0.06]">
                      <tr>
                        <th className="py-4 px-5 text-left">Aluno</th>
                        <th className="py-4 px-5 text-left">Mensalidade Pactuada</th>
                        <th className="py-4 px-5 text-center">Julho/2026</th>
                        <th className="py-4 px-5 text-center">Histórico Recente</th>
                        <th className="py-4 px-5 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {students.map((student) => {
                        const julyPayment = student.payments.find(p => p.month === "Julho/2026") || { status: "pendente" as const };
                        return (
                          <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-5 font-bold text-white text-left">{student.name}</td>
                            <td className="py-4 px-5 font-mono text-gray-300">R$ {student.monthlyFee},00</td>
                            <td className="py-4 px-5 text-center">
                              <button
                                onClick={() => handleTogglePayment(student.id, "Julho/2026", julyPayment.status)}
                                className={`px-3 py-1.5 rounded-xl font-mono text-[9px] font-black tracking-wider uppercase inline-flex items-center gap-1.5 border cursor-pointer transition-all ${
                                  julyPayment.status === "pago"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                                    : julyPayment.status === "atrasado"
                                    ? "bg-red-500/10 text-red-400 border-red-500/25"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                                }`}
                              >
                                <span className={`h-1 w-1 rounded-full ${julyPayment.status === "pago" ? "bg-emerald-400" : julyPayment.status === "atrasado" ? "bg-red-400" : "bg-amber-400"}`} />
                                <span>{julyPayment.status}</span>
                              </button>
                            </td>
                            <td className="py-4 px-5 text-center text-[10px] text-gray-400 font-mono">
                              {student.payments.filter(p => p.month !== "Julho/2026").map(p => (
                                <span key={p.month} className="mr-3 inline-flex items-center gap-1 text-emerald-400 font-bold">
                                  ✓ {p.month.split("/")[0]}
                                </span>
                              ))}
                            </td>
                            <td className="py-4 px-5 text-right">
                              <button
                                onClick={() => handleTogglePayment(student.id, "Julho/2026", julyPayment.status)}
                                className="text-[#CCFF00] hover:text-white font-mono font-bold text-[10px] uppercase border border-[#CCFF00]/20 hover:border-white px-2.5 py-1 rounded-lg bg-[#CCFF00]/5 transition-colors cursor-pointer"
                              >
                                Cobrar / Alternar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#CCFF00]/[0.02] border border-dashed border-[#CCFF00]/20 p-4.5 rounded-2xl flex items-start gap-3 text-left">
                  <Info className="h-4.5 w-4.5 text-[#CCFF00] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    <strong>Sistema Autogerenciável:</strong> O livro-caixa sincroniza o faturamento consolidado de forma dinâmica. Lance valores de mensalidade individualizados no formulário de matrícula para customizar a receita recorrente do seu negócio fitness.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FUTURE VISION SHOWCASE */}
            {trainerTab === "future" && (
              <div className="space-y-8 text-left">
                
                {/* Visual grid explaining differentiation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-[#121622] border border-[#222735] rounded-xl p-6 space-y-4">
                    <div className="p-2 bg-lime-950/40 text-[#CCFF00] rounded-lg w-fit">
                      <Award className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">Criado por um Personal Trainer Ativo</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Ao contrário de grandes softwares genéricos desenvolvidos por corporações distantes do chão de treino, LB Trainer resolve dores autênticas do dia a dia de consultorias presenciais e híbridas.
                    </p>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#CCFF00]" />
                        <span>Prescrição ultrarrápida sem burocracia desnecessária.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#CCFF00]" />
                        <span>Foco em monitoramento real de progressão de cargas.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#CCFF00]" />
                        <span>Comunicação simplificada e envio de feedback em 1 clique.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#121622] border border-[#222735] rounded-xl p-6 space-y-4">
                    <div className="p-2 bg-lime-950/40 text-[#CCFF00] rounded-lg w-fit">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">Próximas Ondas de Inovação</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      O roteiro tecnológico futuro da LB Trainer prevê o empoderamento total do profissional através de dados de wearables e modelos de linguagem generativos:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-300">
                      <div className="p-3 bg-[#0E1015] border border-[#222735] rounded-lg">
                        <span className="font-bold text-white block">Inteligência Artificial</span>
                        IA generativa que analisa o histórico de cargas e feedbacks para propor os próximos incrementos.
                      </div>
                      <div className="p-3 bg-[#0E1015] border border-[#222735] rounded-lg">
                        <span className="font-bold text-white block">Suporte a Hyrox & Corrida</span>
                        Métricas de ritmo (pace), watts e tempos de transição para o esporte de fitness híbrido que mais cresce no mundo.
                      </div>
                      <div className="p-3 bg-[#0E1015] border border-[#222735] rounded-lg">
                        <span className="font-bold text-white block">Smartwatches Sync</span>
                        Coleta direta de frequência cardíaca de treino, taxa de recuperação e dados de sono para ajustar a carga do dia.
                      </div>
                      <div className="p-3 bg-[#0E1015] border border-[#222735] rounded-lg">
                        <span className="font-bold text-white block">Plataforma SaaS Brasil</span>
                        Modelo de assinatura recorrente para que personal trainers licenciem o LB Trainer com sua própria marca.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Smartwatch active workout mockup preview */}
                <div className="bg-[#121622] border border-[#222735] rounded-xl p-6">
                  <div className="max-w-md mx-auto text-center space-y-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 block">Sincronização em Tempo Real</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Simulador de Tela do Relógio Aluno (WatchOS)</h4>
                    
                    {/* Watch face container */}
                    <div className="mx-auto h-48 w-48 rounded-full bg-black border-4 border-[#222735] flex flex-col justify-center items-center p-4 relative shadow-2xl">
                      <div className="absolute top-3 text-[9px] font-mono text-[#CCFF00]">LB ACTIVE</div>
                      <div className="space-y-1">
                        <span className="text-2xl font-bold font-mono text-white block">142 <span className="text-red-400 text-xs">BPM</span></span>
                        <span className="text-[10px] text-gray-400 uppercase font-mono">Agachamento Barra</span>
                        <span className="text-xs font-mono text-gray-300 block">Série 3 de 4</span>
                      </div>
                      <div className="absolute bottom-3 text-[9px] font-mono text-gray-500">PAUSA: 42s</div>
                      {/* Active indicator ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle cx="92" cy="92" r="84" stroke="#CCFF00" strokeWidth="2" fill="none" strokeDasharray="528" strokeDashoffset="120" />
                      </svg>
                    </div>

                    <p className="text-xs text-gray-400 italic">No futuro SaaS, o aluno poderá ditar as repetições feitas diretamente no relógio, calculando automaticamente o volume e tempo sob tensão de forma integrada.</p>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================
            PORTAL 2: STUDENT PORTAL MOBILE SIMULATOR
            ======================================================== */}
        {activePortal === "student" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            
            {/* Simulation settings upper header */}
            <div className="bg-[#121622] border border-[#222735] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">Simulação de Perfil de Aluno</span>
                <p className="text-xs text-gray-400">Escolha abaixo qual aluno está visualizando o app no momento para testar roteiros distintos:</p>
              </div>

              <div>
                <select
                  value={studentViewId}
                  onChange={(e) => {
                    setStudentViewId(e.target.value);
                    setActiveRunningWorkout(null);
                    triggerToast(`Visualizando como: ${students.find(s => s.id === e.target.value)?.name}`);
                  }}
                  className="bg-[#0E1015] border border-[#222735] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.goal})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile frame container wrapper */}
            <div className="bg-[#121622] border border-[#222735] rounded-2xl p-4 sm:p-6 md:p-8">
              
              {/* Outer phone screen mockup */}
              <div className="max-w-md mx-auto bg-[#0E1015] rounded-[32px] border-4 border-[#222735] overflow-hidden shadow-2xl relative flex flex-col min-h-[640px] text-left">
                
                {/* Phone Speaker Notch */}
                <div className="w-1/3 h-5 bg-[#222735] mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-black rounded-full" />
                </div>

                {/* Inner Header for Aluno Portal */}
                <div className="bg-[#121622] pt-8 px-5 pb-4 border-b border-[#222735] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#CCFF00] tracking-wider uppercase font-bold">Portal do Aluno LB</span>
                    <h3 className="font-bold text-white text-base leading-tight">{activeStudentInPortal.name}</h3>
                  </div>
                  <div className="relative">
                    <Bell className="h-4.5 w-4.5 text-gray-400 hover:text-white cursor-pointer" onClick={() => setStudentTab("notifs")} />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                  </div>
                </div>

                {/* Simulated Phone Content Area */}
                <div className="flex-1 p-5 overflow-y-auto space-y-6">

                  {/* IF ACTIVE WORKOUT RUNNER IS RUNNING */}
                  {activeRunningWorkout ? (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Active running header */}
                      <div className="bg-[#CCFF00] text-[#0E1015] p-4 rounded-xl space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-wider">
                          <span>SESSÃO DE TREINO ATIVA</span>
                          <span className="animate-pulse">● EM CURSO</span>
                        </div>
                        <h4 className="font-bold text-sm">{activeRunningWorkout.name}</h4>
                        <p className="text-[11px] opacity-80">{activeRunningWorkout.description}</p>
                      </div>

                      {/* Training items checklist */}
                      <div className="space-y-3">
                        {activeRunningWorkout.items.map((item) => {
                          const state = runningWorkoutProgress[item.id] || { weight: item.weight, reps: item.reps, done: [] };
                          return (
                            <div key={item.id} className="bg-[#121622] border border-[#222735] p-4 rounded-xl space-y-3 text-left">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-bold text-xs text-white block">{getExerciseName(item.exerciseId)}</span>
                                  {item.notes && <span className="text-[10px] text-gray-400 block italic mt-0.5">Tip: {item.notes}</span>}
                                </div>
                                <span className="text-[9px] font-mono bg-stone-900 text-gray-300 px-1.5 py-0.5 rounded">
                                  {item.sets} séries
                                </span>
                              </div>

                              {/* Interactive Sets checklist */}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C2132]">
                                <div className="space-y-1">
                                  <label className="block text-[9px] uppercase font-mono text-gray-500">Carga Utilizada</label>
                                  <div className="flex items-center space-x-1.5">
                                    <input
                                      type="number"
                                      value={state.weight}
                                      onChange={(e) => {
                                        setRunningWorkoutProgress({
                                          ...runningWorkoutProgress,
                                          [item.id]: { ...state, weight: Number(e.target.value) }
                                        });
                                      }}
                                      className="w-14 bg-[#0E1015] border border-[#222735] rounded p-1 text-center text-xs text-white font-mono"
                                    />
                                    <span className="text-[10px] text-gray-400">kg</span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-[9px] uppercase font-mono text-gray-500">Repetições</label>
                                  <input
                                    type="text"
                                    value={state.reps}
                                    onChange={(e) => {
                                      setRunningWorkoutProgress({
                                        ...runningWorkoutProgress,
                                        [item.id]: { ...state, reps: e.target.value }
                                      });
                                    }}
                                    className="w-full bg-[#0E1015] border border-[#222735] rounded p-1 text-center text-xs text-white font-mono"
                                  />
                                </div>
                              </div>

                              {/* Tap-to-check buttons */}
                              <div className="flex gap-1 pt-1.5">
                                {state.done.map((isSetDone, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      const nextDone = [...state.done];
                                      nextDone[idx] = !nextDone[idx];
                                      setRunningWorkoutProgress({
                                        ...runningWorkoutProgress,
                                        [item.id]: { ...state, done: nextDone }
                                      });
                                      triggerToast(`Série ${idx + 1} alterada!`);
                                    }}
                                    className={`flex-1 py-1 px-1 text-[9px] font-bold rounded font-mono transition-all border ${
                                      isSetDone
                                        ? "bg-[#CCFF00] text-[#0E1015] border-lime-400"
                                        : "bg-transparent border-[#222735] text-gray-400 hover:text-white"
                                    }`}
                                  >
                                    Sér. {idx + 1}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Completion Notes */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-mono text-gray-400 text-left">Observações do Treino</label>
                        <textarea
                          value={runningWorkoutNotes}
                          onChange={(e) => setRunningWorkoutNotes(e.target.value)}
                          className="w-full bg-[#121622] border border-[#222735] rounded-xl px-3 py-2 text-xs text-white h-16 focus:outline-none"
                          placeholder="Ex: Treino rendeu muito. O agachamento livre foi pesado mas sem dor lombar."
                        />
                      </div>

                      {/* Action controllers */}
                      <div className="flex gap-2.5 pt-3">
                        <button
                          onClick={() => {
                            if (confirm("Cancelar treino e descartar logs?")) {
                              setActiveRunningWorkout(null);
                              triggerToast("Treino cancelado.");
                            }
                          }}
                          className="flex-1 bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs font-bold py-2.5 rounded-xl uppercase text-center"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleCompleteWorkoutSession}
                          className="flex-1 bg-[#CCFF00] text-[#0E1015] font-mono text-xs font-bold py-2.5 rounded-xl uppercase text-center flex items-center justify-center space-x-1"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Finalizar Treino</span>
                        </button>
                      </div>

                    </div>
                  ) : (
                    <>
                      {/* SUB-TAB 1: WORKOUTS LIST */}
                      {studentTab === "workouts" && (
                        <div className="space-y-4 text-left animate-fade-in">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">Treinos Disponíveis ({activeStudentInPortal.workouts.length})</h4>
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                              Atualizado hoje
                            </span>
                          </div>

                          <div className="space-y-3">
                            {activeStudentInPortal.workouts.length === 0 ? (
                              <div className="bg-[#121622] border border-[#222735] rounded-2xl p-6 text-center text-xs text-gray-500 italic space-y-2">
                                <p>Sua LB Trainer está preparando sua nova grade de treinamentos.</p>
                                <p className="text-[10px] text-gray-400">Verifique novamente mais tarde ou contate o personal.</p>
                              </div>
                            ) : (
                              activeStudentInPortal.workouts.map((work) => (
                                <div key={work.id} className="bg-[#121622] border border-[#222735] rounded-xl p-4 space-y-3">
                                  <div className="space-y-0.5">
                                    <h5 className="font-bold text-sm text-white">{work.name}</h5>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">{work.description}</p>
                                  </div>

                                  <div className="border-t border-[#1C2132] pt-2.5 space-y-1.5">
                                    {work.items.map((item, idx) => (
                                      <div key={item.id} className="flex justify-between text-xs text-gray-300">
                                        <span>{idx + 1}. {getExerciseName(item.exerciseId)}</span>
                                        <span className="font-mono text-[10px] text-gray-400">{item.sets}séries x {item.reps} @ {item.weight}kg</span>
                                      </div>
                                    ))}
                                  </div>

                                  <button
                                    onClick={() => handleStartWorkoutSession(work)}
                                    className="w-full bg-[#CCFF00] text-[#0E1015] hover:bg-lime-400 font-mono text-xs font-bold uppercase tracking-wider py-2 rounded-lg flex items-center justify-center space-x-1.5 mt-2 transition-colors"
                                  >
                                    <Play className="h-3.5 w-3.5 fill-[#0E1015]" />
                                    <span>Iniciar Treino</span>
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 2: HISTÓRICO DE TREINOS */}
                      {studentTab === "history" && (
                        <div className="space-y-4 text-left animate-fade-in">
                          <h4 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">Histórico de Sessões Realizadas</h4>

                          <div className="space-y-2.5">
                            {completedLogs.filter(l => l.studentId === studentViewId).length === 0 ? (
                              <p className="text-xs text-gray-500 italic text-center p-4">Nenhuma sessão concluída por você ainda.</p>
                            ) : (
                              completedLogs
                                .filter(l => l.studentId === studentViewId)
                                .map((log) => (
                                  <div key={log.id} className="bg-[#121622] border border-[#222735] rounded-xl p-3.5 space-y-2 text-left">
                                    <div className="flex justify-between items-start">
                                      <span className="font-bold text-xs text-white block leading-tight">{log.workoutName}</span>
                                      <span className="text-[9px] text-[#CCFF00] font-mono bg-lime-950/40 px-1.5 py-0.5 rounded whitespace-nowrap">
                                        {log.date}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 italic">"{log.notes}"</p>
                                    <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-[#1C2132]">
                                      <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {log.durationMinutes} minutos de esforço</span>
                                      <span className="text-[#CCFF00] font-mono">Consistente</span>
                                    </div>
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 3: EVOLUÇÃO FÍSICA CHART */}
                      {studentTab === "evolution" && (
                        <div className="space-y-4 text-left animate-fade-in">
                          <h4 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">Histórico de Avaliações</h4>

                          {/* Graphical presentation of evaluations weight */}
                          <div className="bg-[#121622] border border-[#222735] rounded-xl p-4 text-center space-y-4">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Curva de Peso Corporal (kg)</span>
                            
                            {/* Beautiful simulated responsive SVG Chart */}
                            <div className="h-32 w-full flex items-end justify-between px-4 pb-2 relative pt-4">
                              
                              {/* Horizontal axis grid line */}
                              <div className="absolute left-0 right-0 bottom-8 h-[1px] bg-[#222735]" />
                              <div className="absolute left-0 right-0 bottom-16 h-[1px] bg-[#222735]/50" />

                              {activeStudentInPortal.evaluations.map((ev, index, arr) => {
                                // Calculate simple bar heights based on value relative to min/max
                                const weights = arr.map(e => e.weight);
                                const min = Math.min(...weights) - 2;
                                const max = Math.max(...weights) + 2;
                                const percent = ((ev.weight - min) / (max - min)) * 100;
                                
                                return (
                                  <div key={ev.id} className="flex-1 flex flex-col items-center z-10">
                                    <div className="text-[10px] font-mono text-white font-bold mb-1">
                                      {ev.weight}kg
                                    </div>
                                    
                                    {/* Vertical Bar */}
                                    <div className="w-6 bg-[#CCFF00] rounded-t-sm transition-all duration-500" style={{ height: `${Math.max(15, percent)}px` }} />
                                    
                                    <span className="text-[9px] text-gray-500 font-mono mt-2 uppercase tracking-tight">
                                      {ev.date.split("-")[2]}/{ev.date.split("-")[1]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Evolução física coletada no consultório LB Trainer.</p>
                          </div>

                          {/* Detail of evaluations list */}
                          <div className="space-y-2">
                            {activeStudentInPortal.evaluations.map((ev) => (
                              <div key={ev.id} className="bg-[#121622] border border-[#222735] p-3.5 rounded-xl text-xs space-y-1">
                                <div className="flex justify-between font-bold text-white">
                                  <span>Data: {ev.date}</span>
                                  <span className="text-[#CCFF00] font-mono">{ev.weight} kg</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                                  <span>% Gordura (BF): <strong>{ev.fatPercent}%</strong></span>
                                  <span>% Massa Muscular: <strong>{ev.musclePercent}%</strong></span>
                                  <span>Cintura: <strong>{ev.waist}cm</strong></span>
                                  <span>Quadril: <strong>{ev.hip}cm</strong></span>
                                </div>
                                {ev.notes && <p className="text-[10px] text-gray-500 italic pt-1 border-t border-[#1C2132] mt-1">"{ev.notes}"</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 4: NOTIFICATIONS INBOX */}
                      {studentTab === "notifs" && (
                        <div className="space-y-4 text-left animate-fade-in">
                          <h4 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">Mensagens & Avisos</h4>

                          <div className="space-y-2.5">
                            {notifications.filter(n => n.studentId === studentViewId).length === 0 ? (
                              <p className="text-xs text-gray-500 italic text-center py-6">Nenhum aviso no momento.</p>
                            ) : (
                              notifications
                                .filter(n => n.studentId === studentViewId)
                                .map((notif) => (
                                  <div key={notif.id} className={`p-3.5 rounded-xl border text-xs text-left space-y-1 relative ${notif.read ? "bg-[#121622] border-[#222735]" : "bg-[#1C2132] border-[#CCFF00]/40"}`}>
                                    <div className="flex justify-between items-start">
                                      <span className="font-bold text-white block">{notif.title}</span>
                                      <span className="text-[9px] text-gray-400 font-mono shrink-0">{notif.date}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-300">{notif.body}</p>
                                    {!notif.read && (
                                      <button
                                        onClick={() => {
                                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                                          triggerToast("Notificação marcada como lida");
                                        }}
                                        className="text-[#CCFF00] hover:underline text-[10px] block mt-1"
                                      >
                                        Marcar como lida
                                      </button>
                                    )}
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>

                {/* Bottom Navigation Buttons on Phone */}
                <div className="bg-[#121622] border-t border-[#222735] h-14 grid grid-cols-4 items-center justify-center text-center text-gray-400 z-10">
                  <button
                    onClick={() => { setStudentTab("workouts"); setActiveRunningWorkout(null); }}
                    className={`flex flex-col items-center justify-center h-full space-y-0.5 text-[10px] font-bold ${studentTab === "workouts" ? "text-[#CCFF00]" : "hover:text-white"}`}
                  >
                    <Dumbbell className="h-4.5 w-4.5" />
                    <span>Treinos</span>
                  </button>
                  <button
                    onClick={() => { setStudentTab("history"); setActiveRunningWorkout(null); }}
                    className={`flex flex-col items-center justify-center h-full space-y-0.5 text-[10px] font-bold ${studentTab === "history" ? "text-[#CCFF00]" : "hover:text-white"}`}
                  >
                    <Clipboard className="h-4.5 w-4.5" />
                    <span>Histórico</span>
                  </button>
                  <button
                    onClick={() => { setStudentTab("evolution"); setActiveRunningWorkout(null); }}
                    className={`flex flex-col items-center justify-center h-full space-y-0.5 text-[10px] font-bold ${studentTab === "evolution" ? "text-[#CCFF00]" : "hover:text-white"}`}
                  >
                    <TrendingUp className="h-4.5 w-4.5" />
                    <span>Evolução</span>
                  </button>
                  <button
                    onClick={() => { setStudentTab("notifs"); setActiveRunningWorkout(null); }}
                    className={`flex flex-col items-center justify-center h-full space-y-0.5 text-[10px] font-bold relative ${studentTab === "notifs" ? "text-[#CCFF00]" : "hover:text-white"}`}
                  >
                    <Bell className="h-4.5 w-4.5" />
                    <span>Mensagens</span>
                    {notifications.filter(n => n.studentId === studentViewId && !n.read).length > 0 && (
                      <span className="absolute top-2.5 right-6 h-1.5 w-1.5 rounded-full bg-red-500" />
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Elegant Technical Footer */}
      <footer className="border-t border-[#222735] bg-[#0E1015] py-10 px-6 mt-16 text-center text-xs text-gray-500 font-mono space-y-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#CCFF00] font-black">LB TRAINER</span>
            <span>MVP DEVELOPMENT</span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-gray-500">
            Conceito & Usabilidade de alto nível desenvolvidos sob medida para portfólio de engenharia de software
          </p>
        </div>
      </footer>

    </div>
  );
}
