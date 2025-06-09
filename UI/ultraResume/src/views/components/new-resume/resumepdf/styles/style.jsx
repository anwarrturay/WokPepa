import { StyleSheet, Font } from '@react-pdf/renderer';
Font.register({
    family:'Open Sans',
    src: "http://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf",
    fontWeight: 700
})

export const styles = StyleSheet.create({
    page: {
        padding: '40 30',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Open Sans',
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        gap: 25,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 6,
        fontWeight: "bold"
    },
    sectionHeaderIcon: {
        width: 16,
        height: 16,
        opacity: 0.8,
    },
    sectionHeaderText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1a365d',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    leftSection: {
        flex: 3.2,
        paddingRight: 25,
        borderRight: '1px solid #E5E7EB',

        header: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            marginBottom: 30,
            gap: 20,
        },
        userImageContainer: {
            width: 110,
            height: 110,
            overflow: 'hidden',
        },
        userImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 10,
        },
        nameprofessionCont: {
            flex: 1,
        },
        username: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: -10,
            color: '#1a365d',
            letterSpacing: 0.5,
        },
        jobtitle:{
            fontSize: 11,
            marginTop: 9,
            color: '#4a5568',
        },
        profileSection: {
            marginBottom: 28,
        },
        profileText: {
            fontSize: 11,
            color: '#4a5568',
            lineHeight: 1.6,
            textAlign: 'justify',
        },
        employmentSection: {
            marginBottom: 28,
        },
        dateandJob: {
            marginBottom: 14,
        },
        job: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: 2,
        },
        durationOfJob: {
            fontSize: 11,
            color: '#718096',
            marginBottom: 4,
        },
        jobHistory: {
            fontSize: 11,
            color: '#4a5568',
            lineHeight: 1.5,
            textAlign: 'justify',
        },
        educationSummary: {
            marginBottom: 14,
        },
        level: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: 2,
        },
        graduatedWith: {
            fontSize: 11,
            color: '#4a5568',
            marginBottom: 2,
        },
        projectDescTitle: {
            marginBottom: 16,
        },
        projectTitle: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: 3,
        },
        projectDesc: {
            fontSize: 11,
            color: '#4a5568',
            lineHeight: 1.5,
            textAlign: 'justify',
        },
        technologies: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginTop: 6,
        },
        cert1: {
            marginBottom: 10,
        },
        cert: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: 2,
        },
        organization: {
            fontSize: 11,
            color: '#718096',
        },
    },
    rightSection: {
        flex: 1.8,
        paddingLeft: 25,

        rightHeader: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#1a365d',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: 6,
        },
        userPersonalDetails: {
            marginBottom: 28,
        },
        userD: {
            fontSize: 11,
            color: '#4a5568',
            marginBottom: 5,
            lineHeight: 1.4,
        },
        email: {
            fontSize: 11,
            color: '#2b6cb0',
            marginBottom: 5,
            textDecoration: 'underline',
        },
        sectionLabel: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: 4,
            marginTop: 12,
        },
        sectionContent: {
            fontSize: 11,
            color: '#4a5568',
            marginBottom: 3,
            lineHeight: 1.4,
        },
        languagesCont: {
            marginBottom: 28,
        },
        skillsSection: {
            marginBottom: 28,
        },
        skillItem: {
            fontSize: 11,
            color: '#4a5568',
            marginBottom: 5,
            lineHeight: 1.4,
        },
    },
});