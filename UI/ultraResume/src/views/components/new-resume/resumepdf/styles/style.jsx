import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    body: {
        padding: 0,
    },
    page: {
        padding: 0,
    },
    section: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    leftSection:{
        display: "flex",
        flexDirection: "column",
        width: "490px",
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
            width: '80px',
            marginTop: '20px',
        },
        nameprofessionCont:{
            marginLeft: "10px"
        },
        username:{
            fontWeight: "bold",
            fontSize: "28px"
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
            width: "20px"
        },
        profileText:{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px"
        },
        profileSummary:{
            fontSize: "15px",
            color: "#474846",
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
            width: "20px",
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
        job:{
            fontSize: "17px"
        },
        jobHistory:{
            flexDirection: 'row',
            marginTop: "4px",
            color: "#474846",
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
        level:{
            fontSize: "17px"
        },
        startAndEnd:{
            fontSize: "12px",
            color: "#64748B",
            marginTop: "7px"
        },
        graduatedWith: {
            fontSize: "13px",
            marginTop: "7px",
            color: "#0D1717"
        },
        projects:{
            display: "flex",
            flexDirection: "Column",
            marginTop: "16px"
        },
        projectsHeader:{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            marginBottom: "13px"
        },
        networkIcon:{
            width: "20px"
        },
        projectTextCont:{
            marginLeft: "10px"
        },
        projectText:{
            fontSize: "20px",
            fontWeight: "bold"
        },
        projectDescTitle:{
            marginLeft: "12px"
        },
        projectTitle:{
            fontSize: "17px",
        },
        projectDesc:{
            fontSize: "15px",
            color: "#64748B",
            marginTop: "12px"
        },
        technologies: {
            marginTop: "10px",
            fontSize: "15px",
            color: "#0D1717"
        },
        certificationHeading:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: "15px"
        }, layersIcon:{
            width: "20px",
            marginRight: "7px"
        }, certText:{
            fontWeight: "bold"
        }, cert1:{
            display: "flex",
            wrap: true
        }, cert2:{
            display: "flex",
            wrap: true,
            marginVertical: "9px"
        }, cert:{
            fontWeight: "semibold"
        }, references:{
            display: "flex",
            flexDirection: "Column",
            marginTop: "16px"
        }, referencesHeading:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: "15px"
        }, linkIcon:{
            width: "20px",
            marginRight: "7px"
        }, refText:{
            fontWeight: "bold"
        }, referenceDetails:{
            marginVertical: "8px"
        },nameAndRel:{
            display: "flex",
            flexDirection: "row",
            marginBottom: "5px"
        }

    },
    rightSection: {  
        display: "flex",
        flexDirection: "column",
        width: "380px",
        position: "relative",
        top: "140px",
        marginLeft: "15%",

        rightHeader:{
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "10px"
        },
        userPersonalDetails:{
            fontSize: "15px",
            marginTop: "8px",
            color: "#0D1717"
        },
        userD:{
            marginTop: "10px"
        },
        email:{
            color: "#2A5D9E",
            marginVertical: "10px",
            fontWeight: "semibold"
        }, 
        dobAndCountry:{
            marginVertical: "10px"
        },
        dateOrPlaceHeading:{
            color: "#64748B",
            marginBottom: "10px"
        },
        cityOfBirth:{
            marginTop: "8px"
        },
        nationalityCont:{
            marginVertical: "10px"
        },
        nationalityHeading:{
            color: "#64748B",
            marginBottom: "6px"
        },
        languagesCont:{
            fontSize: "15px",
            marginVertical: "8px"
        },
        languages:{
            position: "relative",
            bottom: "7px",
            color: "#64748B"
        }, lang:{
            position: "relative",
            top: "3px"
        },
        skills:{
            marginVertical: "12px",
            fontSize:  "15px"
        }, skillHeading:{
            position: "relative",
            bottom: "7px",
            fontSize: "17px",
            color: "#64748B"
        }, skill:{
            marginVertical: "3px"
        }, 
        hobbiesCont:{
            fontSize: "15px",
        },hobbiesHeading:{
            position: "relative",
            bottom: "5px",
            color: "#64748B"
        }, hobbies:{
            wrap: true
        }
    },
});