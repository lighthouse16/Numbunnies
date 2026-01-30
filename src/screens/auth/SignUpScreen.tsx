import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LowBtn, SSBarWithSaveAreaWithColorScheme, ViewCol, TopBarWithThingInMiddleAllCustomableWithColorScheme } from '../../../assets/Class';
import * as CTEXT from '../../../assets/CustomText';
import * as SVG from '../../../assets/svgXml';
import styles, { vw } from '../../../assets/stylesheet';
import { componentStyleList, NGHIASTYLE } from '../../../assets/componentStyleSheet';
import { useContext } from 'react';
import { RootContext } from '../../../data/store';
import authService from '../../services/auth/authService';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { signUp, loading } = useAuth();
  const [CurrentCache] = useContext(RootContext);
  const COLORSCHEME = CurrentCache.colorScheme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', general: '' });

  const validateForm = (): boolean => {
    const newErrors = { email: '', password: '', confirmPassword: '', general: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!authService.validateEmail(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      const passwordValidation = authService.validatePassword(password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message || '';
        isValid = false;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await signUp(email, password);
      // Navigation handled by AuthContext
    } catch (error: any) {
      setErrors({ ...errors, general: error.message || 'Sign up failed' });
    }
  };

  return (
    <SSBarWithSaveAreaWithColorScheme>
      <TopBarWithThingInMiddleAllCustomableWithColorScheme
        returnPreScreenFnc={() => navigation.goBack()}
        returnPreScreenIcon={SVG.sharpLeftArrow(vw(6), vw(6), COLORSCHEME.gray1)}
        centerChildren={
          <CTEXT.NGT_Inter_DispMd_SemiBold>Create Account</CTEXT.NGT_Inter_DispMd_SemiBold>
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.flex1]}
      >
        <ScrollView
          style={[styles.flex1, styles.paddingH4vw]}
          contentContainerStyle={[styles.gap4vw, styles.paddingV4vw]}
        >
          <ViewCol style={[styles.gap2vw]}>
            <CTEXT.NGT_Inter_HeaderMd_SemiBold>Email</CTEXT.NGT_Inter_HeaderMd_SemiBold>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: '', general: '' });
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              style={[
                componentStyleList.roundBorderGray200 as any,
                styles.paddingH4vw,
                styles.paddingV3vw,
                { color: COLORSCHEME.text, backgroundColor: COLORSCHEME.backgroundFade },
                errors.email ? { borderColor: NGHIASTYLE.NghiaError500, borderWidth: 2 } : null
              ]}
              placeholderTextColor={NGHIASTYLE.NghiaGray500 as string}
            />
            {errors.email ? (
              <CTEXT.NGT_Inter_BodySm_Reg color={NGHIASTYLE.NghiaError500 as string}>
                {errors.email}
              </CTEXT.NGT_Inter_BodySm_Reg>
            ) : null}
          </ViewCol>

          <ViewCol style={[styles.gap2vw]}>
            <CTEXT.NGT_Inter_HeaderMd_SemiBold>Password</CTEXT.NGT_Inter_HeaderMd_SemiBold>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: '', general: '' });
              }}
              placeholder="At least 6 characters"
              secureTextEntry
              editable={!loading}
              style={[
                componentStyleList.roundBorderGray200 as any,
                styles.paddingH4vw,
                styles.paddingV3vw,
                { color: COLORSCHEME.text, backgroundColor: COLORSCHEME.backgroundFade },
                errors.password ? { borderColor: NGHIASTYLE.NghiaError500, borderWidth: 2 } : null
              ]}
              placeholderTextColor={NGHIASTYLE.NghiaGray500 as string}
            />
            {errors.password ? (
              <CTEXT.NGT_Inter_BodySm_Reg color={NGHIASTYLE.NghiaError500 as string}>
                {errors.password}
              </CTEXT.NGT_Inter_BodySm_Reg>
            ) : null}
          </ViewCol>

          <ViewCol style={[styles.gap2vw]}>
            <CTEXT.NGT_Inter_HeaderMd_SemiBold>Confirm Password</CTEXT.NGT_Inter_HeaderMd_SemiBold>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors({ ...errors, confirmPassword: '', general: '' });
              }}
              placeholder="Re-enter your password"
              secureTextEntry
              editable={!loading}
              style={[
                componentStyleList.roundBorderGray200 as any,
                styles.paddingH4vw,
                styles.paddingV3vw,
                { color: COLORSCHEME.text, backgroundColor: COLORSCHEME.backgroundFade },
                errors.confirmPassword ? { borderColor: NGHIASTYLE.NghiaError500, borderWidth: 2 } : null
              ]}
              placeholderTextColor={NGHIASTYLE.NghiaGray500 as string}
            />
            {errors.confirmPassword ? (
              <CTEXT.NGT_Inter_BodySm_Reg color={NGHIASTYLE.NghiaError500 as string}>
                {errors.confirmPassword}
              </CTEXT.NGT_Inter_BodySm_Reg>
            ) : null}
          </ViewCol>

          {errors.general ? (
            <View style={[componentStyleList.roundFillBrand100 as any, styles.padding3vw, { borderColor: NGHIASTYLE.NghiaError500, borderWidth: 2 }]}>
              <CTEXT.NGT_Inter_BodyMd_Reg color={NGHIASTYLE.NghiaError700 as string}>
                {errors.general}
              </CTEXT.NGT_Inter_BodyMd_Reg>
            </View>
          ) : null}

          <LowBtn
            title={loading ? 'Creating account...' : 'Create Account'}
            onPress={handleSignUp}
            bgColor={COLORSCHEME.brandMain}
            fontColor={COLORSCHEME.background}
            FontElement={CTEXT.NGT_Inter_HeaderLg_SemiBold}
            CustomStyle={[loading ? { opacity: 0.6 } : null]}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            disabled={loading}
            style={[styles.paddingV2vw]}
          >
            <CTEXT.NGT_Inter_BodyLg_Reg style={[styles.textCenter]}>
              Already have an account?{' '}
              <CTEXT.NGT_Inter_BodyLg_SemiBold color={COLORSCHEME.brandMain}>
                Login
              </CTEXT.NGT_Inter_BodyLg_SemiBold>
            </CTEXT.NGT_Inter_BodyLg_Reg>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SSBarWithSaveAreaWithColorScheme>
  );
}
