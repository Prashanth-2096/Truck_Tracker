import React from "react";
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    textAlign: 'left',
    padding: 5,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  tableCellLast: {
    fontSize: 12,
    flex: 1,
    textAlign: 'left',
    padding: 5,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const PDFDocument = ({ selectedTruck }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Truck Details Report</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Truck Number:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.truck_no}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Truck Type:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.truck_type}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Entered Location:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.location_enter}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Exit Location:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.location_exit}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Time of Entry:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.time_stamp_enter}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Time of Exit:</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.time_stamp_exit}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Location_r</Text>
          <Text style={styles.tableCellLast}>{selectedTruck.location_r}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
