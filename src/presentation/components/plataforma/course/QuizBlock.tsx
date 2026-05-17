'use client';

import { useState } from 'react';
import { Quiz } from '@/domain/entities/Quiz';

interface Props {
  quiz: Quiz;
  onPass: () => void;
}

type Phase = 'intro' | 'answering' | 'result';

export function QuizBlock({ quiz, onPass }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = quiz.questions[current];
  const total = quiz.questions.length;

  const correctCount = Object.entries(answers).filter(
    ([qid, aid]) => quiz.questions.find((q) => q.id === qid)?.correctId === aid
  ).length;

  const score = Math.round((correctCount / total) * 100);
  const passed = score >= quiz.passingScore;

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);
    setAnswers((prev) => ({ ...prev, [question.id]: selected }));
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setPhase('result');
      if (passed) {
        localStorage.setItem(`tnm:quiz-passed:${quiz.sectionId}`, 'true');
        onPass();
      }
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers({});
    setPhase('answering');
  };

  if (phase === 'intro') {
    return (
      <div className="mt-8 rounded-2xl border border-[#FFC107]/30 bg-[#FFC107]/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🧠</span>
          <h3 className="text-lg font-bold text-white">{quiz.title}</h3>
        </div>
        <p className="text-sm mb-1" style={{ color: 'var(--tnm-text-muted)' }}>
          {total} preguntas · Necesitas {quiz.passingScore}% para aprobar
        </p>
        <p className="text-sm mb-6" style={{ color: 'var(--tnm-text-muted)' }}>
          Demuestra lo que aprendiste en esta sección antes de continuar.
        </p>
        <button
          onClick={() => setPhase('answering')}
          className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#FFC107] text-black hover:bg-[#F59E0B] transition-colors duration-200"
        >
          Comenzar quiz →
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="mt-8 rounded-2xl border p-8 text-center"
        style={{ borderColor: passed ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)', background: passed ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)' }}>
        <div className="text-5xl mb-4">{passed ? '🏆' : '😅'}</div>
        <h3 className="text-2xl font-black text-white mb-2">
          {passed ? '¡Excelente!' : 'Casi lo logras'}
        </h3>
        <p className="text-4xl font-black mb-1" style={{ color: passed ? '#4ade80' : '#f87171' }}>
          {score}%
        </p>
        <p className="text-sm mb-2" style={{ color: 'var(--tnm-text-muted)' }}>
          {correctCount} de {total} respuestas correctas
        </p>

        {/* Resumen de respuestas */}
        <div className="mt-6 text-left space-y-3">
          {quiz.questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctId;
            return (
              <div key={q.id} className="rounded-xl p-4 border"
                style={{ borderColor: isCorrect ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)', background: isCorrect ? 'rgba(74,222,128,0.05)' : 'rgba(248,113,113,0.05)' }}>
                <p className="text-xs font-bold mb-1" style={{ color: isCorrect ? '#4ade80' : '#f87171' }}>
                  {isCorrect ? '✓ Correcta' : '✗ Incorrecta'} — Pregunta {i + 1}
                </p>
                <p className="text-sm text-white font-medium mb-1">{q.question}</p>
                {!isCorrect && (
                  <p className="text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {!passed && (
            <button onClick={handleRetry}
              className="px-5 py-2.5 rounded-full text-sm font-bold border border-white/20 text-white hover:border-white/40 transition-colors">
              Intentar de nuevo
            </button>
          )}
          {passed && (
            <p className="text-sm text-green-400 font-medium">
              ✓ Puedes continuar a la siguiente sección
            </p>
          )}
        </div>
      </div>
    );
  }

  // Phase: answering
  const isCorrect = confirmed && selected === question.correctId;
  const isWrong = confirmed && selected !== question.correctId;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <span className="text-sm font-bold text-white">{quiz.title}</span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/10" style={{ color: 'var(--tnm-text-muted)' }}>
          {current + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-white/10 mb-6">
        <div
          className="h-full rounded-full bg-[#FFC107] transition-all duration-500"
          style={{ width: `${((current + (confirmed ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-base font-bold text-white mb-5">{question.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-5">
        {question.options.map((opt) => {
          let style = 'border-white/15 bg-white/5 text-white hover:border-[#FFC107]/50 hover:bg-[#FFC107]/5';
          if (selected === opt.id && !confirmed) style = 'border-[#FFC107] bg-[#FFC107]/10 text-white';
          if (confirmed && opt.id === question.correctId) style = 'border-green-400/60 bg-green-400/10 text-green-300';
          else if (confirmed && opt.id === selected && isWrong) style = 'border-red-400/60 bg-red-400/10 text-red-300';
          else if (confirmed) style = 'border-white/10 bg-white/5 text-white/40';

          return (
            <button
              key={opt.id}
              disabled={confirmed}
              onClick={() => setSelected(opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${confirmed ? 'cursor-default' : 'cursor-pointer'} ${style}`}
            >
              <span className="font-bold mr-2">{opt.id.toUpperCase()})</span>
              {opt.text}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className={`rounded-xl px-4 py-3 mb-5 text-sm ${isCorrect ? 'bg-green-400/10 text-green-300' : 'bg-red-400/10 text-red-300'}`}>
          {isCorrect ? '✓ ¡Correcto! ' : '✗ No exactamente. '}
          <span style={{ color: 'var(--tnm-text-muted)' }}>{question.explanation}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#FFC107] text-black hover:bg-[#F59E0B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#FFC107] text-black hover:bg-[#F59E0B] transition-colors"
          >
            {current + 1 < total ? 'Siguiente →' : 'Ver resultados'}
          </button>
        )}
      </div>
    </div>
  );
}
