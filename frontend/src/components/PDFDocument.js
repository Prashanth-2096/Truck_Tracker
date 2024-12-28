import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

// PDF Document Component
const PDFDocument = ({ selectedTruck }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Truck Details Report</Text>
      <Text style={styles.section}></Text>

      <Text style={styles.tableHeader}>Truck Details</Text>
      <div style={styles.table}>
        
          <div style={styles.tableRow}>
            <Text>Truck Number: {selectedTruck.truck_no}</Text>
            <Text>Truck Type: {selectedTruck.truck_type}</Text>
            <Text>Entered Location: {selectedTruck.location_enter}</Text>
            <Text>Exit Location: {selectedTruck.location_exit}</Text>
            <Text>Time of Entry: {selectedTruck.time_stamp_enter}</Text>
            <Text>Time of Exit: {selectedTruck.time_stamp_exit}</Text>
          </div>
        
      </div>
    </Page>
  </Document>
);

export default PDFDocument;
