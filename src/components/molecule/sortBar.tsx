import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { SortKey, SortOrder } from "@/helpers/sort.helpers";

type Props = {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onChangeKey: (key: SortKey) => void;
  onToggleOrder: () => void;
};

const SortBar = ({ sortKey, sortOrder, onChangeKey, onToggleOrder }: Props) => {
  const active = (key: SortKey) => [
    styles.button,
    sortKey === key && styles.buttonActive,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          style={active("date")}
          activeOpacity={1}
          onPress={() => onChangeKey("date")}
        >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={active("salary")}
          activeOpacity={1}
          onPress={() => onChangeKey("salary")}
        >
          <Text style={styles.buttonText}>Salaire</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.order}
        activeOpacity={1}
        onPress={onToggleOrder}
      >
        <Text style={styles.orderText}>
          {sortOrder === "asc" ? "▲ Asc" : "▼ Desc"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#eaeaea",
  },
  buttonActive: {
    backgroundColor: "#c39af5ff",
  },
  buttonText: {
    color: "#111",
    fontWeight: "700",
  },
  order: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#dcdcdc",
  },
  orderText: {
    fontWeight: "700",
  },
});

export default SortBar;
