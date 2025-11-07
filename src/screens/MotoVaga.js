import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SectionList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemedStyles, useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import {
  listMotos,
  createMoto as createMotoSvc,
  updateMoto as updateMotoSvc,
  deleteMoto as deleteMotoSvc,

  listVagas,
  createVaga as createVagaSvc,
  updateVaga as updateVagaSvc,
  deleteVaga as deleteVagaSvc,
} from '../services/motoVagaApi';

function cardSkin(colors, kind) {
  if (kind === 'moto') return { bg: colors.secondary, fg: colors.onSecondary };
  return { bg: colors.primary, fg: colors.onPrimary };
}

function IconBtn({ name, onPress, color, size = 22, hit = 8 }) {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={{ top: hit, bottom: hit, left: hit, right: hit }}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

function HeroCard({ title, subtitle, icon, bg, fg, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: bg,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 16,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: fg, fontSize: 20, fontWeight: '900' }}>{title}</Text>
          {!!subtitle && (
            <Text style={{ color: fg, opacity: 0.92, marginTop: 6, fontWeight: '600' }}>
              {subtitle}
            </Text>
          )}
        </View>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.25)',
          }}
        >
          <MaterialCommunityIcons name={icon} size={30} color={fg} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MotoVaga() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [openMoto, setOpenMoto] = useState(false);
  const [openVaga, setOpenVaga] = useState(false);

  const [motos, setMotos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [loadingMoto, setLoadingMoto] = useState(false);
  const [loadingVaga, setLoadingVaga] = useState(false);

  const [motoId, setMotoId] = useState(null);
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const [vagaId, setVagaId] = useState(null);
  const [status, setStatus] = useState('');
  const [numero, setNumero] = useState('');
  const [patio, setPatio] = useState('');

  // API Moto
  const fetchMotos = useCallback(async () => {
    try {
      setLoadingMoto(true);
      const data = await listMotos();
      setMotos(data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as motos.');
    } finally {
      setLoadingMoto(false);
    }
  }, []);

  const createMoto = useCallback(async (body) => {
    await createMotoSvc(body);
  }, []);

  const updateMoto = useCallback(async (id, body) => {
    await updateMotoSvc(id, body);
  }, []);

  const deleteMoto = useCallback(async (id) => {
    await deleteMotoSvc(id);
  }, []);

  // API Vaga
  const fetchVagas = useCallback(async () => {
    try {
      setLoadingVaga(true);
      const data = await listVagas();
      setVagas(data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as vagas.');
    } finally {
      setLoadingVaga(false);
    }
  }, []);

  const createVaga = useCallback(async (body) => {
    await createVagaSvc(body);
  }, []);

  const updateVaga = useCallback(async (id, body) => {
    await updateVagaSvc(id, body);
  }, []);

  const deleteVaga = useCallback(async (id) => {
    await deleteVagaSvc(id);
  }, []);

  useEffect(() => { if (openMoto) fetchMotos(); }, [openMoto, fetchMotos]);
  useEffect(() => { if (openVaga) fetchVagas(); }, [openVaga, fetchVagas]);

  function resetMotoForm() {
    setMotoId(null);
    setPlaca('');
    setMarca('');
    setModelo('');
    setAno('');
  }
  function resetVagaForm() {
    setVagaId(null);
    setStatus('');
    setNumero('');
    setPatio('');
  }

  async function handleSaveMoto() {
    if (!placa || !marca || !modelo || !ano) {
      return Alert.alert('Atenção', 'Preencha placa, marca, modelo e ano.');
    }
    try {
      const body = { placa, marca, modelo, ano };
      if (motoId) {
        await updateMoto(motoId, body);
      } else {
        await createMoto(body);
      }
      resetMotoForm();
      fetchMotos();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar a moto.');
    }
  }

  function startEditMoto(item) {
    setMotoId(item.id);
    setPlaca(item.placa || '');
    setMarca(item.marca || '');
    setModelo(item.modelo || '');
    setAno(String(item.ano || ''));
    if (!openMoto) setOpenMoto(true);
  }
  async function handleDeleteMoto(id) {
    Alert.alert('Excluir', 'Deseja excluir esta moto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try { await deleteMoto(id); fetchMotos(); } catch { Alert.alert('Erro', 'Não foi possível excluir.'); }
      } },
    ]);
  }

  async function handleSaveVaga() {
    if (!status || !numero || !patio) {
      return Alert.alert('Atenção', 'Preencha status, número e pátio.');
    }
    try {
      const body = { status, numero, patio };
      if (vagaId) {
        await updateVaga(vagaId, body);
      } else {
        await createVaga(body);
      }
      resetVagaForm();
      fetchVagas();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar a vaga.');
    }
  }

  function startEditVaga(item) {
    setVagaId(item.id);
    setStatus(item.status ?? '');
    setNumero(String(item.numero || ''));
    setPatio(item.patio || '');
    if (!openVaga) setOpenVaga(true);
  }
  async function handleDeleteVaga(id) {
    Alert.alert('Excluir', 'Deseja excluir esta vaga?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try { await deleteVaga(id); fetchVagas(); } catch { Alert.alert('Erro', 'Não foi possível excluir.'); }
      } },
    ]);
  }

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      root: { flex: 1, backgroundColor: colors.background, padding: 16 },

      formCard: {
        backgroundColor: colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        marginBottom: 10,
      },
      formTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
      formTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
      closePill: {
        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card,
      },
      closePillText: { color: colors.text, fontWeight: '700' },
      row: { flexDirection: 'row', gap: 10 },
      col: { flex: 1 },
      label: { color: colors.text, fontWeight: '700', marginTop: 8, marginBottom: 6 },
      input: {
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card,
        color: colors.text, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
      },
      saveBtn: {
        marginTop: 12, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, alignItems: 'center',
      },
      saveText: { color: colors.onPrimary, fontWeight: '800' },

      itemCard: {
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        marginBottom: 10,
      },
      itemTitle: { color: colors.text, fontWeight: '800' },
      itemSub: { color: colors.textMuted, marginTop: 4 },
      itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },

      sep: { height: 10 },
      loaderRow: { paddingVertical: 18, alignItems: 'center' },
      listFooterSpace: { height: 24 },
    })
  );

  const sections = useMemo(() => ([
    {
      key: 'moto',
      title: t('motovaga.moto') || 'Moto',
      open: openMoto,
      data: openMoto ? motos : [],
    },
    {
      key: 'vaga',
      title: t('motovaga.vaga') || 'Vaga',
      open: openVaga,
      data: openVaga ? vagas : [],
    },
  ]), [openMoto, openVaga, motos, vagas, t]);


  const renderSectionHeader = ({ section }) => {
    if (!section.open) {
      const { bg, fg } = cardSkin(colors, section.key);
      return (
        <HeroCard
          title={section.title}
          subtitle={
            section.key === 'moto'
              ? (t('motovaga.motoSub') || 'Cadastre e gerencie as motos')
              : (t('motovaga.vagaSub') || 'Cadastre e gerencie as vagas')
          }
          icon={section.key === 'moto' ? 'motorbike' : 'parking'}
          bg={bg}
          fg={fg}
          onPress={() => (section.key === 'moto' ? setOpenMoto(true) : setOpenVaga(true))}
        />
      );
    }

    return (
      <View style={styles.formCard}>
        <View style={styles.formTitleRow}>
          <Text style={styles.formTitle}>
            {section.key === 'moto'
              ? (motoId ? (t('motovaga.editarMoto') || 'Editar moto') : (t('motovaga.cadastrarMoto') || 'Cadastrar moto'))
              : (vagaId ? (t('motovaga.editarVaga') || 'Editar vaga') : (t('motovaga.cadastrarVaga') || 'Cadastrar vaga'))}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (section.key === 'moto') { resetMotoForm(); setOpenMoto(false); }
              else { resetVagaForm(); setOpenVaga(false); }
            }}
            style={styles.closePill}
          >
            <Text style={styles.closePillText}>{t('comum.fechar') || 'Fechar'}</Text>
          </TouchableOpacity>
        </View>

        {section.key === 'moto' ? (
          <View>
            <Text style={styles.label}>{t('motovaga.placa') || 'Placa'}</Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="ABC1D23" placeholderTextColor="#999" />

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{t('motovaga.marca') || 'Marca'}</Text>
                <TextInput style={styles.input} value={marca} onChangeText={setMarca} placeholder="Ex: Honda" placeholderTextColor="#999" />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{t('motovaga.modelo') || 'Modelo'}</Text>
                <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Ex: CG 160" placeholderTextColor="#999" />
              </View>
            </View>

            <Text style={styles.label}>{t('motovaga.ano') || 'Ano'}</Text>
            <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="2024" keyboardType="numeric" placeholderTextColor="#999" />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveMoto}>
              <Text style={styles.saveText}>{t('comum.salvar') || 'Salvar'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{t('motovaga.status') || 'Status'}</Text>
                <TextInput
                  style={styles.input}
                  value={status}
                  onChangeText={setStatus}
                  placeholder="livre / ocupada"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{t('motovaga.numero') || 'Número'}</Text>
                <TextInput style={styles.input} value={numero} onChangeText={setNumero} placeholder="15" placeholderTextColor="#999" />
              </View>
            </View>

            <Text style={styles.label}>{t('motovaga.patio') || 'Pátio'}</Text>
            <TextInput style={styles.input} value={patio} onChangeText={setPatio} placeholder="Ex: Central" placeholderTextColor="#999" />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveVaga}>
              <Text style={styles.saveText}>{t('comum.salvar') || 'Salvar'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };


  const renderItem = ({ item, section }) => {
    if (section.key === 'moto') {
      return (
        <View style={styles.itemCard}>
          <Text style={styles.itemTitle}>
            {(t('motovaga.modelo') || 'Modelo')}: {item.marca} {item.modelo}
          </Text>
          <Text style={styles.itemSub}>
            {(t('motovaga.placa') || 'Placa')}: {item.placa}{"  "}
            {(t('motovaga.ano') || 'Ano')}: {item.ano}
          </Text>
          <View style={styles.itemRow}>
            <Text style={[styles.itemSub, { opacity: 0.85 }]}>ID: {item.id}</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <IconBtn name="pencil-outline" color={colors.secondary} onPress={() => startEditMoto(item)} />
              <IconBtn name="trash-can-outline" color="#E15B58" onPress={() => handleDeleteMoto(item.id)} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.itemCard}>
        <Text style={styles.itemTitle}>
          {(t('motovaga.numero') || 'Número')}: {item.numero}
        </Text>
        <Text style={styles.itemSub}>
          {(t('motovaga.patio') || 'Pátio')}: {item.patio}{"  "}
          {(t('motovaga.status') || 'Status')}: {item.status}
        </Text>
        <View style={styles.itemRow}>
          <Text style={[styles.itemSub, { opacity: 0.85 }]}>ID: {item.id}</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <IconBtn name="pencil-outline" color={colors.primary} onPress={() => startEditVaga(item)} />
            <IconBtn name="trash-can-outline" color="#E15B58" onPress={() => handleDeleteVaga(item.id)} />
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = (item, index) => String(item?.id ?? index);

  return (
    <View style={styles.root}>
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        SectionSeparatorComponent={() => <View style={styles.sep} />}
        ListFooterComponent={<View style={styles.listFooterSpace} />}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={null}

        renderSectionFooter={({ section }) => {
          if (!section.open) return null;
          const isLoading = section.key === 'moto' ? loadingMoto : loadingVaga;
          if (!isLoading) return null;
          return (
            <View style={styles.loaderRow}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          );
        }}
      />
    </View>
  );
}
