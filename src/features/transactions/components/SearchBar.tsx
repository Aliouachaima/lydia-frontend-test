import { HStack, IconButton, Input } from "@chakra-ui/react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <HStack gap={2} align="center">
      <Search size={18} opacity={0.7} />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher par label…"
        aria-label="Search transactions by label"
        size="lg"
        bg="white"
      />
      {value ? (
        <IconButton
          aria-label="Clear search"
          variant="ghost"
          onClick={() => onChange("")}
        >
          <X size={16} />
        </IconButton>
      ) : null}
    </HStack>
  );
}
