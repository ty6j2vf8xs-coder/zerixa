import type { ParsedRfq } from "@/lib/parseRfq";
import { scoreRfq, type RfqScoreCriterion } from "@/lib/rfq-score";

export type AgentCriterionId =
  | "product"
  | "quantity"
  | "destination"
  | "incoterms"
  | "payment";

export type AgentTurn = {
  criterionId: AgentCriterionId;
  question: string;
  answer: string;
};

export type AgentChatMessage = {
  role: "agent" | "user";
  text: string;
};

export const AGENT_INTRO =
  "Hi — I'll help you build a quote-ready request. Just answer one question at a time.";

export function getQuestionForCriterion(
  id: AgentCriterionId,
  parsed: ParsedRfq | null,
): string {
  switch (id) {
    case "product":
      return "How would you describe the product you need?";
    case "quantity":
      return "What quantity do you need? Include the unit — tons, m², pieces, containers, etc.";
    case "destination":
      return parsed?.needsBuyerDestination
        ? "Which country are you buying from? (FOB/EXW often names a Turkish port — we need your location.)"
        : "Where should the materials go? A city or country is enough.";
    case "incoterms":
      return "Which delivery term do you prefer? For example CIF, FOB, EXW, CFR, or DDP.";
    case "payment":
      return "How would you like to pay? T/T wire transfer is standard — LC at sight is also possible.";
  }
}

export function buildRequestFromTurns(turns: AgentTurn[]): string {
  return turns
    .map((turn) => turn.answer.trim())
    .filter(Boolean)
    .join(", ");
}

export function getNextCriterion(
  parsed: ParsedRfq | null,
  text: string,
): RfqScoreCriterion | null {
  const { criteria } = scoreRfq(parsed, text);
  return criteria.find((item) => !item.met) ?? null;
}

export function getAgentCompletionMessage(score: number): string {
  if (score >= 80) {
    return "Excellent — your request is quote-ready. Tap Continue to add your contact details.";
  }
  if (score >= 60) {
    return "Good progress. You can continue now, or keep answering to improve your RFQ Score.";
  }
  return "Thanks — tap Continue when you're ready to add your contact details.";
}

export function isAgentCriterionId(id: string): id is AgentCriterionId {
  return (
    id === "product" ||
    id === "quantity" ||
    id === "destination" ||
    id === "incoterms" ||
    id === "payment"
  );
}
