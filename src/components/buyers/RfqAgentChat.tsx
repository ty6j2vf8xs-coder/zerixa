"use client";

import { useEffect, useRef, useState } from "react";
import { parseRfq, type ParsedRfq } from "@/lib/parseRfq";
import {
  AGENT_INTRO,
  buildRequestFromTurns,
  getAgentCompletionMessage,
  getNextCriterion,
  getQuestionForCriterion,
  isAgentCriterionId,
  type AgentChatMessage,
  type AgentTurn,
} from "@/lib/rfq-agent";
import { scoreRfq } from "@/lib/rfq-score";
import RfqScorePanel from "@/components/buyers/RfqScorePanel";

type Props = {
  onRequestChange: (text: string) => void;
  parsed: ParsedRfq | null;
  onContinue: () => void;
  canContinue: boolean;
};

function AgentAvatar() {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[10px] font-semibold text-accent-light">
      Z
    </span>
  );
}

export default function RfqAgentChat({
  onRequestChange,
  parsed,
  onContinue,
  canContinue,
}: Props) {
  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const [turns, setTurns] = useState<AgentTurn[]>([]);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [pendingCriterionId, setPendingCriterionId] = useState<string | null>("product");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const requestText = buildRequestFromTurns(turns);
  const score = scoreRfq(parsed, requestText);

  useEffect(() => {
    setMessages([
      { role: "agent", text: AGENT_INTRO },
      { role: "agent", text: getQuestionForCriterion("product", null) },
    ]);
  }, []);

  useEffect(() => {
    onRequestChange(requestText);
  }, [requestText, onRequestChange]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isComplete && pendingCriterionId) {
      inputRef.current?.focus();
    }
  }, [isComplete, pendingCriterionId, messages]);

  function handleSend() {
    const answer = input.trim();
    if (answer.length < 2) {
      setInputError("Please add a bit more detail.");
      return;
    }
    if (!pendingCriterionId || !isAgentCriterionId(pendingCriterionId)) return;

    setInputError("");
    const question = getQuestionForCriterion(pendingCriterionId, parsed);

    const nextTurns: AgentTurn[] = [
      ...turns,
      { criterionId: pendingCriterionId, question, answer },
    ];
    const nextText = buildRequestFromTurns(nextTurns);
    const nextParsed = parseRfq(nextText);
    const parsedForScore = nextParsed.fieldCount > 0 ? nextParsed : null;

    const nextMessages: AgentChatMessage[] = [
      ...messages,
      { role: "user", text: answer },
    ];

    const nextCriterion = getNextCriterion(parsedForScore, nextText);

    if (nextCriterion && isAgentCriterionId(nextCriterion.id)) {
      nextMessages.push({
        role: "agent",
        text: getQuestionForCriterion(nextCriterion.id, parsedForScore),
      });
      setPendingCriterionId(nextCriterion.id);
      setIsComplete(false);
    } else {
      const finalScore = scoreRfq(parsedForScore, nextText).score;
      nextMessages.push({
        role: "agent",
        text: getAgentCompletionMessage(finalScore),
      });
      setPendingCriterionId(null);
      setIsComplete(true);
    }

    setTurns(nextTurns);
    setMessages(nextMessages);
    setInput("");
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <div className="border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <AgentAvatar />
            <div>
              <p className="text-sm font-medium">Zerixa RFQ Guide</p>
              <p className="text-[11px] text-muted">Guided request · score updates live</p>
            </div>
            {requestText && (
              <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-light">
                {score.score}/100
              </span>
            )}
          </div>
        </div>

        <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message, index) =>
            message.role === "agent" ? (
              <div key={index} className="flex items-start gap-2.5">
                <AgentAvatar />
                <p className="mt-1 max-w-[85%] rounded-2xl rounded-tl-md border border-accent/20 bg-accent/5 px-4 py-2.5 text-sm leading-relaxed">
                  {message.text}
                </p>
              </div>
            ) : (
              <div key={index} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-tr-md border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed">
                  {message.text}
                </p>
              </div>
            ),
          )}
        </div>

        {!isComplete && pendingCriterionId && (
          <div className="border-t border-border px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (inputError) setInputError("");
                }}
                placeholder="Type your answer…"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
              />
              <button
                type="submit"
                disabled={input.trim().length < 2}
                className="shrink-0 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-light disabled:opacity-40"
              >
                Send
              </button>
            </form>
            {inputError && <p className="mt-2 text-xs text-red-400">{inputError}</p>}
          </div>
        )}
      </div>

      {requestText && <RfqScorePanel text={requestText} parsed={parsed} />}

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      {!canContinue && requestText.length > 0 && (
        <p className="text-center text-xs text-muted">
          Answer the product question, or attach a BOQ PDF above, to continue.
        </p>
      )}
    </div>
  );
}
