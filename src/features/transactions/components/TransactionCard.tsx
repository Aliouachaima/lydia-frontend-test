import { Badge, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import type { Transaction } from "../types";
import { formatDateFromSeconds } from "../utils/format";

function statusColor(status: Transaction["status"]) {
  switch (status) {
    case "completed":
      return "green";
    case "pending":
      return "orange";
    case "canceled":
      return "red";
  }
}

function statusLabel(status: Transaction["status"]) {
  switch (status) {
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "canceled":
      return "Canceled";
  }
}

type Props = {
  tx: Transaction;
  onOpenDetails?: () => void;
};

export function TransactionCard({ tx, onOpenDetails }: Props) {
  const receiverFullName = [tx.receiverFirstname, tx.receiverLastname]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      p={5}
      bg="white"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
      transition="0.15s"
    >
      <HStack justify="space-between" align="start" gap={4}>
        <VStack align="start" gap={1} flex={1}>
          <Text
            data-testid="transaction-label"
            fontWeight="semibold"
            fontSize="md"
            lineClamp={2}
          >
            {tx.label}
          </Text>

          <Text fontSize="sm" color="gray.600">
            {tx.firstname} {tx.lastname} → {receiverFullName || "—"}
          </Text>

          <Text fontSize="sm" color="gray.500">
            {formatDateFromSeconds(tx.date)}
          </Text>
        </VStack>

        <VStack align="end" gap={2}>
          <Text fontWeight="bold" fontSize="lg">
            {tx.amount}
          </Text>

          <Badge colorPalette={statusColor(tx.status)} variant="subtle">
            {statusLabel(tx.status)}
          </Badge>
        </VStack>
      </HStack>

      {tx.status === "canceled" && tx.statusErrorDisplay ? (
        <Text mt={3} fontSize="sm" color="red.600">
          {tx.statusErrorDisplay}
        </Text>
      ) : null}

      <HStack mt={4} justify="end">
        <Button size="sm" variant="outline" onClick={onOpenDetails}>
          Voir détails
        </Button>
      </HStack>
    </Box>
  );
}
