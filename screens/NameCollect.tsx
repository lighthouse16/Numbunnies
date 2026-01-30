import { View, Text, Alert, Image, ImageStyle } from 'react-native'
import React, { useContext } from 'react'
import { BoardingInput, LowBtn, RoundBtn, SSBarWithSaveArea, SSBarWithSaveAreaWithColorScheme, TopBarWithThingInMiddleAllCustomable, TopBarWithThingInMiddleAllCustomableWithColorScheme, ViewCol, ViewColBetweenCenter, ViewColCenter } from '../assets/Class'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import styles, { vw } from '../assets/stylesheet'
import * as SVG from '../assets/svgXml'
import { NGHIASTYLE } from '../assets/componentStyleSheet'
import { currentSetUser, RootContext } from '../data/store'
import { NGT_Inter_BodyLg_ExtraBold, NGT_Inter_DispLg_Bld, NGT_Inter_DispLg_Reg, NGT_Inter_DispLg_SemiBold, NGT_Inter_DispMd_SemiBold, NGT_Inter_HeaderLg_Bld, NGT_Inter_HeaderLg_ExtraBold, NGT_Inter_HeaderLg_SemiBold, NGT_Inter_HeaderMd_Reg, RobotoMonoReg14 } from '../assets/CustomText'
import { storageSaveUser } from '../data/storageFunc'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function NameCollect() {
    const navigation = useNavigation()
    const { t } = useTranslation();
    const [CurrentCache, dispatch] = useContext(RootContext)
    const [name, setName] = React.useState<string>('')
    const [firstClick, setFirstClick] = React.useState<boolean>(false)
    const inset = useSafeAreaInsets()
    let COLOR = CurrentCache.colorScheme
    return (
        <SSBarWithSaveAreaWithColorScheme>
            {
                firstClick ?
                    <>
                        <TopBarWithThingInMiddleAllCustomableWithColorScheme
                            returnPreScreenFnc={() => { navigation.goBack() }}
                            bgColor='transparent'
                            returnPreScreenIcon={SVG.sharpLeftArrow(vw(6), vw(6), COLOR.textBrand)}
                        />

                        <ViewCol style={[styles.padding6vw, styles.justifyContentSpaceBetween, styles.flex1]}>
                            <View>
                                <NGT_Inter_DispLg_Reg color={COLOR.textBrand} children={t('onboarding.beforeStart')} />
                                <NGT_Inter_DispLg_Reg color={COLOR.textBrand} children={t('onboarding.introduceYourself')} />
                            </View>
                            <BoardingInput
                                title={t('onboarding.nameQuestion')}
                                placeholder={t('onboarding.namePlaceholder')}
                                value={name}
                                onChgText={(value) => { setName(value as string) }}
                                textClass={NGT_Inter_DispLg_SemiBold}
                                CustomStyleText={[{ color: COLOR.text }]}
                                CustomStyleInput={[{ backgroundColor: COLOR.backgroundFade }]}
                                activeColor={COLOR.textBrand}
                                passiveColor={COLOR.text}
                            />
                            <LowBtn
                                title={t('onboarding.continue')}
                                onPress={() => {
                                    storageSaveUser({
                                        name: name,
                                        lang: 'vi-VN',
                                    }).then((res) => {
                                        if (res) {
                                            dispatch(currentSetUser({ name: name, lang: 'vi-VN' }))
                                            navigation.navigate('BottomTab' as never)
                                        } else {
                                            Alert.alert(t('onboarding.error'), t('onboarding.tryAgain'))
                                        }
                                    })
                                }}
                                bgColor={COLOR.brandMain}
                                fontColor={COLOR.background}
                                FontElement={NGT_Inter_HeaderLg_SemiBold}
                            />
                        </ViewCol>
                    </>
                    :
                    <>
                        <ViewColCenter style={[styles.flex1, styles.w100, styles.positionRelative]}>
                            <Image source={require('../assets/photos/onboard.png')} resizeMode='contain' resizeMethod='resize' style={[styles.w100vw, styles.h60vw] as ImageStyle} />
                            <Text style={[styles.textCenter, { color: COLOR.textBrand, fontSize: vw(8), fontFamily: 'Inter-SemiBold', fontWeight: 600 }]}>{t('app.name')}</Text>
                            <LowBtn CustomStyle={[styles.positionAbsolute, { bottom: inset.bottom || vw(4) }]} title={t('onboarding.start')} onPress={() => { setFirstClick(true) }} bgColor={COLOR.brandMain} fontColor='white' FontElement={NGT_Inter_DispMd_SemiBold} />
                        </ViewColCenter>
                    </>
            }

        </SSBarWithSaveAreaWithColorScheme>
    )
}