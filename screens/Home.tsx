import { View, Text, Animated, ScrollView, TouchableOpacity, Platform, Image, ImageStyle, FlatList } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { storageGetItem, storageGetList } from '../data/storageFunc';
import styles, { vh, vw } from '../assets/stylesheet';
import clrStyle, { componentStyleList, NGHIASTYLE } from '../assets/componentStyleSheet';
import { RootContext } from '../data/store';
import * as CLASS from '../assets/Class';
import * as SVG from '../assets/svgXml';
import * as CTEXT from '../assets/CustomText';
import * as Progress from 'react-native-progress';
import { CardTitleFormat, QuestTitleFormat } from '../data/interfaceFormat';
import { fetchInitialData, fetchLastTouchData, getInitialCardTitleList, marginBottomForScrollView } from '../assets/component';

export default function Home() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [CurrentCache, dispatch] = useContext(RootContext);
  const COLORSCHEME = CurrentCache.colorScheme;

  const [libGradeSelected, setLibGradeSelected] = useState<number>(9);
  const [cardTitleData, setCardTitleData] = useState<CardTitleFormat[]>([]);
  const [cardTitleDataFiltered, setCardTitleDataFiltered] = useState<CardTitleFormat[]>([]);
  const [lastTouchItem, setLastTouchItem] = useState<{ id: string, type: string }>({ id: '', type: '' });
  const [lastTouchData, setLastTouchData] = useState<{ id: string, navigateTo: string, process: number, length: number, title: string, data: CardTitleFormat | any }>();

  const CATEGORY_LIST = [t('home.categories.all'), t('home.categories.new'), t('home.categories.incomplete'), t('home.categories.completed')];

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialCardTitles = await getInitialCardTitleList();
      setCardTitleData(initialCardTitles || []);
      const lastTouch = await storageGetItem('lastTouchItem');
      lastTouch && setLastTouchItem(lastTouch);
    };

    const unsub = navigation.addListener('focus', fetchInitialData);
    return unsub;
  }, [navigation]);

  useEffect(() => {
    const filteredData = cardTitleData.filter(card => card.grade === libGradeSelected);
    setCardTitleDataFiltered(filteredData);
  }, [cardTitleData, libGradeSelected]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => fetchLastTouchData(lastTouchItem, setLastTouchData, navigation));
    fetchLastTouchData(lastTouchItem, setLastTouchData, navigation);

    return () => unsub();
  }, [lastTouchItem.id, navigation]);

  const RenderHeaderSection = useMemo(() => (
    <CLASS.ViewRowBetweenCenter style={[componentStyleList.roundBorderBrand as any, styles.gap4vw, COLORSCHEME.type === 'dark' ? { backgroundColor: NGHIASTYLE.NghiaBrand900 } : null]}>
      <CLASS.ViewCol style={[styles.justifyContentSpaceBetween, { minHeight: vw(30) }, styles.gap2vw, styles.flex1]}>
        <CLASS.ViewRow style={[styles.gap2vw]}>
          <Progress.Circle
            progress={(lastTouchData?.process || 0) / (lastTouchData?.length || 1)}
            size={vw(11)}
            borderWidth={0}
            thickness={vw(1.2)}
            strokeCap='round'
            unfilledColor={NGHIASTYLE.NghiaBrand200 as string}
            color={NGHIASTYLE.NghiaBrand600 as string}
          />
          <CLASS.ViewCol style={[styles.flex1]}>
            <CTEXT.NGT_Inter_BodyMd_Reg>{(lastTouchData?.process || 0)}/{(lastTouchData?.length || 1)} {t('home.completed')}</CTEXT.NGT_Inter_BodyMd_Reg>
            <CTEXT.NGT_Inter_BodyLg_SemiBold>{lastTouchData?.title}</CTEXT.NGT_Inter_BodyLg_SemiBold>
          </CLASS.ViewCol>
        </CLASS.ViewRow>
        <CLASS.RoundBtn
          title={t('home.completeNow')}
          onPress={() => navigation.navigate(lastTouchData?.navigateTo, { item: lastTouchData?.data, current: lastTouchData?.process - 1 })}
          textClass={CTEXT.NGT_Inter_BodyMd_SemiBold}
          textColor={COLORSCHEME.background as string}
          bgColor={COLORSCHEME.brandMain}
          customStyle={[styles.wfit, { paddingHorizontal: vw(4), paddingVertical: vw(1.5), borderRadius: vw(1.5) }]}
        />
      </CLASS.ViewCol>
      <Image source={require('../assets/photos/home1.png')} resizeMethod='resize' resizeMode='contain' style={[styles.w30vw, styles.h30vw] as ImageStyle} />
    </CLASS.ViewRowBetweenCenter>
  ), [COLORSCHEME, lastTouchData, navigation]);

  const RenderLibChooseSection = useMemo(() => (
    <CLASS.ViewCol style={[styles.positionSticky, styles.top0, styles.gap4vw]}>
      <CTEXT.NGT_Inter_DispMd_SemiBold>{t('home.flashcardsTitle')}</CTEXT.NGT_Inter_DispMd_SemiBold>
      <FlatList
        scrollEnabled={false}
        style={[styles.w100, componentStyleList.roundBorderGray200 as any, styles.padding1vw]}
        contentContainerStyle={[styles.flexRowBetweenCenter]}
        data={[9, 8, 7, 6]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setLibGradeSelected(item)}
            style={[styles.paddingV2vw, styles.paddingH4vw, styles.flex1, styles.borderRadius2vw, { backgroundColor: item === libGradeSelected ? COLORSCHEME.brandMain : COLORSCHEME.background }]}
          >
            {item === libGradeSelected ?
              <CTEXT.NGT_Inter_HeaderMd_SemiBold color={COLORSCHEME.background as string}>{t('home.grade')} {item}</CTEXT.NGT_Inter_HeaderMd_SemiBold>
              : <CTEXT.NGT_Inter_HeaderMd_Reg color={NGHIASTYLE.NghiaGray500 as string}>{t('home.grade')} {item}</CTEXT.NGT_Inter_HeaderMd_Reg>
            }
          </TouchableOpacity>
        )}
      />
    </CLASS.ViewCol>
  ), [libGradeSelected, COLORSCHEME]);

  return (
    <CLASS.SSBarWithSaveAreaWithColorScheme>
      <CLASS.TopBarWithThingInMiddleAllCustomableWithColorScheme
        leftItem={<CTEXT.NGT_Inter_DispMd_SemiBold>{t('app.name')}</CTEXT.NGT_Inter_DispMd_SemiBold>}
        rightItemFnc={() => { }}
        rightItemIcon={SVG.optionIcon(vw(6), vw(6), COLORSCHEME.text)}
        style={{
          isAlignItemCenter: true,
          container: [styles.marginBottom4vw]
        }}
      />
      <ScrollView style={[styles.flex1, styles.flexCol, styles.paddingH4vw]} contentContainerStyle={[styles.gap4vw]}>
        {RenderHeaderSection}
        {RenderLibChooseSection}
        {cardTitleDataFiltered.length > 0 ? (
          <CLASS.SelectListAndCardRender
            selectCateList={CATEGORY_LIST}
            sourceData={cardTitleDataFiltered}
            filterFnc={async (item: string, sourceData: CardTitleFormat[]): Promise<any[] | false> => {
              const filterByStatus = (status: number) => sourceData.filter(card => card.status === status);
              switch (item) {
                case t('home.categories.new'):
                  return filterByStatus(0);
                case t('home.categories.incomplete'):
                  return filterByStatus(1);
                case t('home.categories.completed'):
                  return filterByStatus(2);
                case t('home.categories.all'):
                  return sourceData;
                default:
                  return [];
              }
            }}
            selfRunFilterFnc
            renderFnc={(item: CardTitleFormat[]) => (
              item.length > 0 ? <CLASS.CardTitleRenderWithColorScheme data={item} onPressFnc={(par: CardTitleFormat) => navigation.navigate('FlashCard' as never, { item: par })} />
                : <CTEXT.NGT_Inter_HeaderMd_SemiBold>{t('home.noCards')}</CTEXT.NGT_Inter_HeaderMd_SemiBold>
            )}
          />
        ) : (
          <CTEXT.NGT_Inter_HeaderMd_SemiBold>{t('home.noData')}</CTEXT.NGT_Inter_HeaderMd_SemiBold>
        )}
        {marginBottomForScrollView()}
      </ScrollView>
    </CLASS.SSBarWithSaveAreaWithColorScheme>
  );
}
