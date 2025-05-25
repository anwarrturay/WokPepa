import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        padding: '40 30',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        gap: 35,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 6,
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
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            gap: 20,
        },
        userImageContainer: {
            width: 110,
            height: 110,
            borderRadius: 55,
            overflow: 'hidden',
            border: '2px solid #E5E7EB',
        },
        userImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        nameprofessionCont: {
            flex: 1,
        },
        username: {
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 6,
            color: '#1a365d',
            letterSpacing: 0.5,
        },
        profession: {
            fontSize: 15,
            color: '#4a5568',
            letterSpacing: 0.3,
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