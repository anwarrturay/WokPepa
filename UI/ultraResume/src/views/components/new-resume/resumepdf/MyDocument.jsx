// src/components/MyDocument.jsx
import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import toure from "./Toure.png"
import UserIcon from "./icons/user.png";
import Lock from "./icons/lock.png";
import GraduationCap  from './icons/graduation-cap.png';
import NetworkIcon  from './icons/network.png';
import Link from "./icons/link.png";
import Layers from "./icons/layers.png";
import { styles } from './styles/style';

const MyDocument = () => {

    return(

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
                            <Text style={styles.leftSection.job}>Software Engineer, Freetown</Text>
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
                                <Text style={styles.leftSection.level}>Computer Degree and Information Technology</Text>
                                <View style={styles.leftSection.startAndEnd}>
                                    <Text>
                                        January 16, 2022 - December 16, 2026
                                    </Text>
                                </View>
                                <Text style={styles.leftSection.graduatedWith}>
                                    Graduated with a first class Degree honors
                                </Text>
                            </View>
                        </View>
                        {/* Projects section */}
                        <View style={styles.leftSection.projects}>
                            <View style={styles.leftSection.projectsHeader}>
                                <View style={styles.leftSection.projectIconCont}>
                                    <Image 
                                        style={styles.leftSection.networkIcon}
                                        src={NetworkIcon} />
                                </View>
                                <View style={styles.leftSection.projectTextCont}>
                                    <Text style={styles.leftSection.projectText}>Projects</Text>
                                </View>
                            </View>
                            <View style={styles.leftSection.projectDescTitle}>
                                <View style={styles.leftSection.projectTitle}>
                                    <Text>MiSkul App</Text>
                                </View>
                                <Text style={styles.leftSection.projectDesc}>A web app developed using MERN stack and security systems.</Text>
                                <Text style={styles.leftSection.technologies}>
                                    React, MongoDb, TailwindCss, Express, Nodejs
                                </Text>
                            </View>
                        </View>
                        {/* Certifications section */}
                        <View style={styles.leftSection.certifications} break>
                            <View style={styles.leftSection.certificationHeading}>
                                <Image 
                                    src={Layers}
                                    style={styles.leftSection.layersIcon}
                                />
                                <Text style={styles.leftSection.certText}>Certifications</Text>
                            </View>
                            <View style={styles.leftSection.certificates}>
                                <View style={styles.leftSection.cert1}>
                                    <Text style={styles.leftSection.cert}>Best Graduating Student -</Text>
                                    <Text style={styles.leftSection.organization}>Apple(2025-05-01 to 2025-05-01)</Text>
                                </View>
                                <View style={styles.leftSection.cert2}>
                                    <Text style={styles.leftSection.cert}>Best Graduating Student -</Text>
                                    <Text style={styles.leftSection.organization}>Meta(2025-05-01 to 2025-05-01)</Text>
                                </View>
                            </View>
                        </View>
                        {/* References */}
                        <View style={styles.leftSection.references}>
                            <View style={styles.leftSection.referencesHeading}>
                                <Image
                                    src={Link}
                                    style={styles.leftSection.linkIcon}
                                />
                                <Text style={styles.leftSection.refText}>References</Text>
                            </View>
                            <View style={styles.leftSection.referenceDetails}>
                                <View style={styles.leftSection.nameAndRel}>
                                    <Text style={styles.leftSection.nameOfReference}>Mohamed Osman Turay  </Text>
                                    <Text></Text>
                                    <Text>(Father)</Text>
                                </View>
                                <Text>Contact: turaymohamed83@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Right Section  */}
                <View style={styles.rightSection}>
                    <Text style={styles.rightSection.rightHeader}>Details</Text>
                    <View style={styles.rightSection.userPersonalDetails}>
                        <Text style={styles.rightSection.userD}>25 Martin Farmah Street</Text>
                        <Text style={styles.rightSection.userD}>Freetown</Text>
                        <Text style={styles.rightSection.userD}>+23274912538</Text>
                        <Text style={styles.rightSection.email}>anwarrturay@icloud.com</Text>

                        <View style={styles.rightSection.dobAndCountry}>
                            <Text style={styles.rightSection.dateOrPlaceHeading}>Date / Place Of birth</Text>
                            <Text style={styles.rightSection.dob}>16th December, 2003</Text>
                            <Text style={styles.rightSection.cityOfBirth}>Freetown</Text>
                        </View>
                        <View style={styles.rightSection.nationalityCont}>
                            <Text style={styles.rightSection.nationalityHeading}>Nationality</Text>
                            <Text style={styles.rightSection.nationality}>Sierra Leonean</Text>
                        </View>
                    </View>
                    <View style={styles.rightSection.languagesCont}>
                        <Text style={styles.rightSection.languages}>Languages</Text>
                        <Text style={styles.rightSection.lang}>French</Text>
                        <Text style={styles.rightSection.lang}>English</Text>
                        <Text style={styles.rightSection.lang}>Krio</Text>
                        <Text style={styles.rightSection.lang}>Temne</Text>
                    </View>
                    <View style={styles.rightSection.skills}>
                        <Text style={styles.rightSection.skillHeading}>Skills</Text>
                        <Text style={styles.rightSection.skill}>React</Text>
                        <Text style={styles.rightSection.skill}>JavaScript</Text>
                        <Text style={styles.rightSection.skill}>NodeJs</Text>
                        <Text style={styles.rightSection.skill}>TailwindCss</Text>
                        <Text style={styles.rightSection.skill}>Typescript</Text>
                        <Text style={styles.rightSection.skill}>Express</Text>
                        <Text style={styles.rightSection.skill}>UI/UX Designer</Text>
                    </View>
                    <View style={styles.rightSection.hobbiesCont}>
                        <View>
                        <Text style={styles.rightSection.hobbiesHeading}>Hobbies</Text>
                        </View>
                        <Text style={styles.rightSection.hobbies}>Reading, Coding, Listening Music, playing</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
    )
    
};

export default MyDocument;
