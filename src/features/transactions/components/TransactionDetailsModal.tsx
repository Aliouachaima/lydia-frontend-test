import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { Transaction } from "../types";
import { formatDateFromSeconds } from "../utils/format";

type Props = {
  open: boolean;
  onClose: () => void;
  tx: Transaction | null;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <HStack justify="space-between" gap={6}>
      <Text fontSize="sm" color="gray.600">
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="medium" textAlign="right">
        {value || "—"}
      </Text>
    </HStack>
  );
}

export function TransactionDetailsModal({ open, onClose, tx }: Props) {
  if (!open || !tx) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={1000}
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        w="full"
        maxW="720px"
        p={6}
        boxShadow="2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size="md" lineClamp={2}>
          {tx.label}
        </Heading>

        <Text mt={2} color="gray.600" fontSize="sm">
          {formatDateFromSeconds(tx.date)}
        </Text>

        <Box mt={6} borderWidth="1px" borderRadius="xl" p={4} bg="gray.50">
          <Stack gap={3}>
            <Field label="paymentId" value={tx.paymentId} />
            <Field label="memberId" value={String(tx.memberId)} />
            <Field label="firstname" value={tx.firstname} />
            <Field label="lastname" value={tx.lastname} />
            <Field label="receiverFirstname" value={tx.receiverFirstname ?? ""} />
            <Field label="receiverLastname" value={tx.receiverLastname ?? ""} />
            <Field label="amount" value={tx.amount} />
            <Field label="date" value={formatDateFromSeconds(tx.date)} />
            <Field label="statusErrorDisplay" value={tx.statusErrorDisplay || ""} />
            <Field label="status" value={tx.status} />
            <Field label="transactionType" value={tx.transactionType} />
          </Stack>
        </Box>

        <HStack mt={6} justify="end">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
