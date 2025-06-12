import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import UserIcon from "./icons/user.png";
import Lock from "./icons/lock.png";
import GraduationCap from './icons/graduation-cap.png';
import NetworkIcon from './icons/network.png';
import Link from "./icons/link.png";
import Layers from "./icons/layers.png";
import { styles } from './styles/style';

const SectionHeader = ({ icon, text }) => (
  <View style={styles.sectionHeader}>
    <Image src={icon} style={styles.sectionHeaderIcon} />
    <Text style={styles.sectionHeaderText}>{text}</Text>
  </View>
);

const MyDocument = ({ formData }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    personalDetails,
    summary,
    experience,
    education,
    projects,
    certifications,
    languages,
    references,
    hobbies,
    skills,
    image,
  } = formData || {};

  useEffect(() => {
    const handleImage = async () => {
      try {
        if (image instanceof File) {
          const url = URL.createObjectURL(image);
          setImageUrl(url);
          return () => URL.revokeObjectURL(url);
        } else if (typeof image === 'string' && image.startsWith('http')) {
          setImageUrl(image);
        } else if (typeof image === 'string' && image.startsWith('data:image')) {
          setImageUrl(image);
        } else {
          console.warn('Invalid image format:', image);
          setImageUrl(null);
        }
      } catch (error) {
        console.error('Error handling image:', error);
        setImageUrl(null);
      }
    };
    handleImage();
  }, [image]);

  return (
    <Document title={`${personalDetails?.name}'s Resume`} author={personalDetails?.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Left section */}
          <View style={styles.leftSection}>
            {/* Header with image and name */}
            <View style={styles.leftSection.header}>
              <View style={styles.leftSection.userImageContainer}>
                {imageUrl && <Image style={styles.leftSection.userImage} src={imageUrl} />}
              </View>
              <View style={styles.leftSection.nameprofessionCont}>
                <Text style={styles.leftSection.username}>{personalDetails?.name}</Text>
                {experience && (
                  experience.map((job, idx)=>(
                    <View key={idx}>
                      <Text style={styles.leftSection.jobtitle}>{job?.jobTitle}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            {/* Profile */}
            <View style={styles.leftSection.profileSection}>
              <SectionHeader icon={UserIcon} text="Profile" />
              <Text style={styles.leftSection.profileText}>{summary}</Text>
            </View>

            {/* Employment History */}
            {experience?.length > 0 && (
              <View style={styles.leftSection.employmentSection}>
                <SectionHeader icon={Lock} text="Employment History" />
                {experience.map((job, idx) => (
                  <View key={idx} style={styles.leftSection.dateandJob}>
                    <Text style={styles.leftSection.job}>{job.jobTitle}, {job.company}</Text>
                    <Text style={styles.leftSection.durationOfJob}>{job.startDate} - {job.endDate}</Text>
                    {job.responsibilities && (
                      <Text style={styles.leftSection.jobHistory}>{job.responsibilities}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {education?.length > 0 && (
              <View style={styles.leftSection.employmentSection}>
                <SectionHeader icon={GraduationCap} text="Education" />
                {education.map((edu, idx) => (
                  <View key={idx} style={styles.leftSection.educationSummary}>
                    <Text style={styles.leftSection.level}>{edu.level}</Text>
                    <Text style={styles.leftSection.level}>{edu.school}</Text>
                    <Text style={styles.leftSection.graduatedWith}>{edu.degree}</Text>
                    <Text style={styles.leftSection.durationOfJob}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <View style={styles.leftSection.employmentSection}>
                <SectionHeader icon={NetworkIcon} text="Projects" />
                {projects.map((project, idx) => (
                  <View key={idx} style={styles.leftSection.projectDescTitle}>
                    <Text style={styles.leftSection.projectTitle}>{project?.title}</Text>
                    <Text style={styles.leftSection.projectDesc}>{project?.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <View style={styles.leftSection.employmentSection}>
                <SectionHeader icon={Layers} text="Certifications" />
                {certifications.map((cert, idx) => (
                  <View key={idx} style={styles.leftSection.cert1}>
                    <Text style={styles.leftSection.cert}>{cert.name}</Text>
                    <Text style={styles.leftSection.organization}>
                      {cert.issuingOrganization} ({cert.issueDate})
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* References */}
            {references?.length > 0 && (
              <View style={styles.leftSection.employmentSection}>
                <SectionHeader icon={Link} text="References" />
                {references.map((ref, idx) => (
                  <View key={idx} style={styles.leftSection.cert1}>
                    <Text style={styles.leftSection.cert}>{ref.name} ({ref.position})</Text>
                    <Text style={styles.leftSection.organization}>Contact: {ref.contact}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right section */}
          <View style={styles.rightSection}>
            <Text style={styles.rightSection.rightHeader}>Details</Text>
            
            {/* Personal Details */}
            <View style={styles.rightSection.userPersonalDetails}>
              <Text style={styles.rightSection.userD}>{personalDetails?.address}</Text>
              <Text style={styles.rightSection.userD}>{personalDetails?.country}</Text>
              <Text style={styles.rightSection.userD}>{personalDetails?.phone}</Text>
              <Text style={styles.rightSection.email}>{personalDetails?.email}</Text>

              {/* Date/Place of Birth */}
              <View>
                <Text style={styles.rightSection.sectionLabel}>Date / Place of Birth</Text>
                <Text style={styles.rightSection.sectionContent}>{personalDetails?.dob}</Text>
              </View>

              {/* Nationality */}
              <View>
                <Text style={styles.rightSection.sectionLabel}>Nationality</Text>
                <Text style={styles.rightSection.sectionContent}>{personalDetails?.nationality}</Text>
              </View>
            </View>

            {/* Languages */}
            {languages?.length > 0 && (
              <View style={styles.rightSection.languagesCont}>
                <Text style={styles.rightSection.sectionLabel}>Languages</Text>
                {languages.map((lang, idx) => (
                  <Text key={idx} style={styles.rightSection.skillItem}>
                    {typeof lang === 'object' ? `${lang.name} (${lang.level})` : lang}
                  </Text>
                ))}
              </View>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <View style={styles.rightSection.skillsSection}>
                <Text style={styles.rightSection.sectionLabel}>Skills</Text>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={styles.rightSection.skillItem}>
                    {typeof skill === 'object' ? `${skill.name} (${skill.level})` : skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {hobbies?.length > 0 && (
              <View style={styles.rightSection.skillsSection}>
                <Text style={styles.rightSection.sectionLabel}>Hobbies</Text>
                {hobbies.map((hobby, idx) => (
                  <Text key={idx} style={styles.rightSection.skillItem}>{hobby}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
