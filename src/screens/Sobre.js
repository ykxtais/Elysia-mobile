// src/screens/Sobre.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Sobre() {
  const { colors } = useTheme();
  const { t } = useTranslation?.() ?? { t: (s) => s };

  const info = Constants?.expoConfig?.extra ?? {};
  const version = info.appVersion ?? '1.0.0';
  const commit  = info.gitCommit ?? 'desconhecido';
  const build   = info.buildNumber ?? '1';

  const styles = useMemo(() => StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, padding: 20 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    logo: { width: 52, height: 52, borderRadius: 12, marginRight: 12 },
    title: { color: colors.text, fontSize: 20, fontWeight: '800' },
    subtitle: { color: colors.text + '99', fontSize: 13, marginTop: 2 },
    pill: {
      alignSelf: 'flex-start', marginTop: 8,
      paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
      backgroundColor: (colors.primary) + '22', borderWidth: 1, borderColor: (colors.primary) + '66'
    },
    pillText: { color: colors.primary, fontWeight: '700', letterSpacing: 0.3 },

    row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    label: { color: colors.text + '99', fontSize: 13, width: 90 },
    value: { color: colors.text, fontSize: 15, fontWeight: '600' },

    divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },

    buttons: { flexDirection: 'row', alignItems: 'center' },
    cta: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 14, paddingVertical: 10,
      borderRadius: 12, backgroundColor: colors.primary, marginRight: 8,
    },
    ctaText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
    link: { flexDirection: 'row', alignItems: 'center', padding: 10, marginLeft: -10 },
    linkText: { color: colors.text, marginLeft: 8, textDecorationLine: 'underline' },

    section: { marginTop: 16 },
    sectionTitle: { color: colors.text, fontWeight: '800', marginBottom: 8 },

    foot: { marginTop: 22, alignItems: 'center', opacity: 0.85 },
    footText: { color: colors.text + 'bb', fontSize: 12 },

    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  }), [colors]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <View>
              <Text style={styles.title}>{info.appName ?? 'Elysia Mobile'}</Text>
              <Text style={styles.subtitle}>{t('sobre.subtitulo')}</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{t('sobre.estavel')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}><Text style={styles.label}>{t('sobre.versao')}</Text><Text style={styles.value}>{version}</Text></View>
          <View style={styles.row}><Text style={styles.label}>{t('sobre.build')}</Text><Text style={styles.value}>{build}</Text></View>
          <View style={styles.row}><Text style={styles.label}>{t('sobre.commit')}</Text><Text style={styles.value}>{commit}</Text></View>
          {!!info.env && (
            <View style={styles.row}><Text style={styles.label}>{t('sobre.ambiente')}</Text><Text style={styles.value}>{info.env}</Text></View>
          )}

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('sobre.links')}</Text>
            <View style={styles.buttons}>
              {!!info.repoUrl && (
                <TouchableOpacity style={styles.cta} onPress={() => Linking.openURL(info.repoUrl)}>
                  <Feather name="github" size={18} color="#fff" />
                  <Text style={styles.ctaText}>{t('sobre.codigo')}</Text>
                </TouchableOpacity>
              )}
              {!!info.privacyUrl && (
                <TouchableOpacity style={styles.link} onPress={() => Linking.openURL(info.privacyUrl)}>
                  <AntDesign name="link" size={16} color={colors.text} />
                  <Text style={styles.linkText}>{t('sobre.privacidade')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={styles.foot}>
          <Text style={styles.footText}>{t('sobre.rodape')}</Text>
        </View>
      </View>
    </View>
  );
}
