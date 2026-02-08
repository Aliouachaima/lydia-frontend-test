import { HStack, Text } from "@chakra-ui/react";
import type { SortOrder } from "../types";

type Props = {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
};

export function SortSelect({ value, onChange }: Props) {
  return (
    <HStack justify="space-between" align="center">
      <Text fontSize="sm" color="gray.600">
        Trier par date
      </Text>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        aria-label="Sort transactions by date"
        style={{
          width: 220,
          background: "white",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 14,
        }}
      >
        <option value="date_desc">Plus récent</option>
        <option value="date_asc">Plus ancien</option>
      </select>
    </HStack>
  );
}
