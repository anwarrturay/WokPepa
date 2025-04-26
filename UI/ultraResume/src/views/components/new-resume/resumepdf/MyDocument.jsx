// src/components/MyDocument.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import toure from "./Toure.png"
import UserIcon from "./icons/user.png";
import Lock from "./icons/lock.png";
import GraduationCap  from './icons/graduation-cap.png';

const styles = StyleSheet.create({
    body: {
        padding: 0,
    },
    page: {
        padding: 0,
    },
    section: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "row",
        width: '100%',
    },
    leftSection:{
        display: "flex",
        flexDirection: "column",
        width: "490px",
        // backgroundColor: "aqua",
        position: "relative",

        header:{
            display: "flex",
            flexDirection: "row",
            justifyContent: "evenly",
            alignItems:"center",
            margin: "12px"
        },
        userImageContainer:{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ccc",
            borderRadius: "16px",
            width:"150px"
        },
        userImage: {
            width: '90px',
            marginTop: '20px',
        },
        nameprofessionCont:{
            marginLeft: "10px"
        },
        username:{
            fontWeight: "bold",
            fontSize: "24px"
        },
        profession:{
            fontSize: "13px",
            color: "#64748B"
        },
        profileSection: {
            width: "350px"
        },
        profile:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "15px"
        },
        userIcon: {
            width: "24px"
        },
        profileText:{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px"
        },
        profileSummary:{
            fontSize: "15px",
            color: "#64748B",
            marginHorizontal: "15px"
        },
        employmentSection: {
            display: "flex",
            flexDirection: "column",
            margin: "15px",
        },
        employmentHeader:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        lockIcon: {
            width: "24px",
            // height: "24px",
        },
        employmentText: {
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px",
        },
        dateandJob:{
            marginTop: "13px",
            marginLeft: "15px",
        },
        durationOfJob: {
            fontSize: "12px",
            color: "#64748B",
            marginTop: "7px"
        },
        jobHistory:{
            flexDirection: 'row',
            marginTop: "4px"
        },
        educationHeader:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10px"
        },
        graduationCapIcon:{
            width: "24px"
        },
        educationHeading:{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px"
        },
        educationSummary:{
            marginLeft: "10px",
            marginTop: "10px"
        },
        startAndEnd:{
            fontSize: "12px",
            color: "#64748B",
            marginTop: "7px"
        },
        graduatedWith: {
            fontSize: "13px",
            marginTop: "7px",
            color: ""
        }

    },
    rightSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        width: "380px",
        height: "500px",
        position: "relative",
        top: "140px",
        // backgroundColor: "red",
        rightHeader:{
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "10px"
        }
    },
});


const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            {/* Left section */}
            <View style={styles.leftSection}>
                <View style={styles.leftSection.header}>
                    <View style={styles.leftSection.userImageContainer}>
                        <Image 
                            style={styles.leftSection.userImage}
                            src={toure}
                        />
                    </View>
                    <View style={styles.leftSection.nameprofessionCont}>
                        <Text style={styles.leftSection.username}>Anwarr O.B Turay</Text>
                        <Text style={styles.leftSection.profession}>Software Engineer, UI/UX designer</Text>
                    </View>
                </View>
                <View style={styles.leftSection.profileSection}>
                    <View style={styles.leftSection.profile}>
                        <View style={styles.leftSection.userIcon}>
                            <Image
                                style={styles.leftSection.userIcon}
                                src={UserIcon}
                            />
                        </View>
                        <View>
                            <Text style={styles.leftSection.profileText}>Profile</Text>
                        </View>
                    </View>
                    <View style={styles.leftSection.profileSummary}>
                        <Text>I worked at Monimie payment company for like three months as a software engineer and a UI/UX designer for designing and building secure and optimized Api</Text>
                    </View>
                </View>
                {/* Employement section */}
                <View style={styles.leftSection.employmentSection}>
                    <View style={styles.leftSection.employmentHeader}>
                        <View style={styles.leftSection.iconContainer}>
                            <Image 
                                style={styles.leftSection.lockIcon}
                                src={Lock}
                            />
                        </View>
                        <View style={styles.leftSection.employmentText}>
                            <Text>Employment History</Text>
                        </View>
                    </View>
                    <View style={styles.leftSection.dateandJob}> 
                        <View>
                            <Text>Software Engineer, Freetown</Text>
                        </View>
                        <View style={styles.leftSection.durationOfJob}>
                            <Text>August 24, 2025 - December 16, 2025</Text>
                        </View>
                        <View style={styles.leftSection.jobHistory}>
                            <Text style={{ fontSize: "20px" }}>• </Text>
                            <Text style={{ fontSize: "14px" }}>Developed REST APIs for payment processing</Text>
                        </View>
                        <View style={styles.leftSection.jobHistory}>
                            <Text style={{ fontSize: "20px" }}>• </Text>
                            <Text style={{ fontSize: "14px" }}>Developed REST APIs for payment processing</Text>
                        </View>
                        <View style={styles.leftSection.jobHistory}>
                            <Text style={{ fontSize: "20px" }}>• </Text>
                            <Text style={{ fontSize: "14px" }}>Developed REST APIs for payment processing</Text>
                        </View>
                        <View style={styles.leftSection.jobHistory}>
                            <Text style={{ fontSize: "20px" }}>• </Text>
                            <Text style={{ fontSize: "14px" }}>Developed REST APIs for payment processing</Text>
                        </View>
                    </View>
                    {/* Education section. */}
                    <View style={styles.leftSection.education}>
                        <View style={styles.leftSection.educationHeader}>
                            <View>
                                <Image 
                                    style={styles.leftSection.graduationCapIcon}
                                    src={GraduationCap}
                                />
                            </View>
                            <View style={styles.leftSection.educationHeading}>
                                <Text>Education</Text>
                            </View>
                        </View>
                        <View style={styles.leftSection.educationSummary}>
                            <View style={styles.leftSection.level}>
                                <Text>Computer Degree and Information Technology</Text>
                            </View>
                            <View style={styles.leftSection.startAndEnd}>
                                <Text>
                                    January 16, 2022 - December 16, 2026
                                </Text>
                            </View>
                            <View style={styles.leftSection.graduatedWith}>
                                <Text>
                                    Graduated with a first class Degree honors
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* Right Section  */}
            <View style={styles.rightSection}>
                <View>
                    <Text style={styles.rightSection.rightHeader}>Details</Text>
                </View>
            </View>
        </View>
    </Page>
  </Document>
);

export default MyDocument;
