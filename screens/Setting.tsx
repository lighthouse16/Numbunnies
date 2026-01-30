import { View, Text, Animated, ScrollView, TouchableOpacity, Platform, Image, ImageStyle, FlatList, Switch, useColorScheme, Alert } from 'react-native'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../src/contexts/AuthContext';
import { storageClearList, storageGetItem, storageGetList, storageRemove, storageRemoveUser, storageSaveAndOverwrite } from '../data/storageFunc'
import { RoundBtn, SelectorInput, SSBarWithSaveArea, SSBarWithSaveAreaWithColorScheme, TopBarWithThingInMiddleAllCustomable, TopBarWithThingInMiddleAllCustomableWithColorScheme, ViewCol, ViewColStartBetween, ViewRow, ViewRowBetweenCenter } from '../assets/Class'
import * as SVG from '../assets/svgXml'
import styles, { vh, vw } from '../assets/stylesheet'
import * as CTEXT from '../assets/CustomText'
import clrStyle, { componentStyleList, NGHIASTYLE } from '../assets/componentStyleSheet'
import { currentSetIsForceDark, RootContext } from '../data/store'
import * as Progress from 'react-native-progress'

export default function Setting() {
  const navigation = useNavigation()
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [CurrentCache, dispatch] = useContext(RootContext)
  let COLORSCHEME = CurrentCache.colorScheme

  const [isForceDark, setIsForceDark] = useState<boolean>(false)
  useEffect(() => {
    async function getIsFD() {
      let isFD = await storageGetItem('darkMode')
      setIsForceDark(isFD)
    }
    getIsFD()
  }, [])

  return (
    <SSBarWithSaveAreaWithColorScheme>
      <TopBarWithThingInMiddleAllCustomableWithColorScheme
        leftItem={<CTEXT.NGT_Inter_DispMd_SemiBold children={t('setting.title')} />}
        rightItemFnc={() => { }}
        rightItemIcon={SVG.optionIcon(vw(6), vw(6), COLORSCHEME.text)}
        style={{
          isAlignItemCenter: true,
          container: [styles.marginBottom4vw]
        }}
      />
      <ScrollView style={[styles.flex1, styles.flexCol, styles.paddingH4vw]} contentContainerStyle={[styles.gap4vw]}>
        <CTEXT.NGT_Inter_HeaderLg_Bld children={`${t('setting.hello')} ${CurrentCache.user.name}`} />
        <CTEXT.NGT_Inter_HeaderMd_SemiBold children={t('setting.appSettings')} />
        <ViewRowBetweenCenter>
          <ViewRow style={[styles.gap2vw, styles.paddingH2vw]}>
            {SVG.darkMode(vw(6), vw(6), COLORSCHEME.gray1)}
            <CTEXT.NGT_Inter_BodyLg_Reg children={t('setting.alwaysDarkMode')} />
          </ViewRow>
          <Switch
            value={isForceDark}
            onValueChange={(value) => {
              setIsForceDark(value)
              storageSaveAndOverwrite('darkMode', value)
              dispatch(currentSetIsForceDark(value))
            }}
          />
        </ViewRowBetweenCenter>

        <TouchableOpacity onPress={async () => {
          Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
              text: t('common.cancel'),
              style: 'cancel'
            },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: async () => {
                try {
                  await signOut();
                } catch (error: any) {
                  Alert.alert('Error', error.message || 'Failed to logout');
                }
              }
            }
          ])
        }}>
          <ViewRowBetweenCenter>
            <ViewRow style={[styles.gap2vw, styles.paddingH2vw]}>
              {SVG.xIcon(vw(6), vw(6), NGHIASTYLE.NghiaWarning500 as string)}
              <CTEXT.NGT_Inter_BodyLg_Reg children='Logout' />
            </ViewRow>
          </ViewRowBetweenCenter>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          Alert.alert(t('setting.resetTitle'), t('setting.resetWarning'), [
            {
              text: t('common.cancel'),
              style: 'cancel'
            },
            {
              text: t('setting.resetApp'),
              style: 'destructive',
              onPress: async () => {
                storageRemoveUser()
                storageRemove('darkMode')
                storageRemove('flashCard')
                storageClearList('cardTitle')
                storageClearList('mindmap')
                storageClearList('mindmapTitle')
                storageClearList('questTitle')
                storageClearList('flashCard')
                
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'NameCollect' as never }]
                })
              }
            }
          ])
        }}>
          <ViewRowBetweenCenter>
            <ViewRow style={[styles.gap2vw, styles.paddingH2vw]}>
              {SVG.xIcon(vw(6), vw(6), 'red')}
              <CTEXT.NGT_Inter_BodyLg_Reg children={t('setting.resetApp')} />
            </ViewRow>
          </ViewRowBetweenCenter>
        </TouchableOpacity>
      </ScrollView>
    </SSBarWithSaveAreaWithColorScheme>
  )
}