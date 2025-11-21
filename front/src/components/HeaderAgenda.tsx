import { CalendarIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

interface HeaderAgendaProps {
  modo: "mensal" | "semanal";
  alternarModo: () => void;
}

export default function HeaderAgenda({
  modo,
  alternarModo,
}: HeaderAgendaProps) {
  return (
    <div className="flex items-center justify-between mb-0.5 px-2 pt-1 relative">
      <button
        onClick={alternarModo}
        className="flex items-center justify-center w-10 h-10 rounded-2xl border border-white hover:bg-gray-200 transition"
      >
        {modo === "mensal" ? (
          <CalendarIcon className="w-6 h-6" />
        ) : (
          <CalendarDaysIcon className="w-6 h-6" />
        )}
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
        Agenda
      </h1>
    </div>
  );
}
