import React, { Fragment, useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
// import { Text, View, SafeAreaView, Image } from "react-native";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "@app/i18n/i18n";
// import { Colors as Themes, Images, Metrics } from "@app/theme";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Footer from "../../components/view/Footer";
import auth from '@react-native-firebase/auth';
import { useAuth } from "@app/modules/components/context/AuthContext";
import storage from "../../../libs/storage";
import { storageKeys } from "../../../libs/constants";
import { Colors as Themes, Images, Metrics } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import DropdownElement from "../../components/element/DropdownElement";
import { createUser, generateUserId } from "../../../service/userService";
// import { createPost } from "../../../service/postService";

const AddUser = (props) => {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      hoTen: '',
      ngaySinh: '',
      heSoLuong: '',
      luongCB: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newUser = {
        ...data,
        uid: generateUserId(),
      };

      await createUser(newUser);
      Alert.alert('Thành công', 'Đã thêm người dùng thành công');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding user: ', error);
      Alert.alert('Lỗi', 'Không thể thêm người dùng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thêm Người Dùng Mới</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ tên</Text>
        <Controller
          control={control}
          rules={{
            required: 'Họ tên không được để trống',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nhập họ tên"
            />
          )}
          name="hoTen"
        />
        {errors.hoTen && <Text style={styles.errorText}>{errors.hoTen.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ngày sinh (YYYY-MM-DD)</Text>
        <Controller
          control={control}
          rules={{
            required: 'Ngày sinh không được để trống',
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Ngày sinh phải có định dạng YYYY-MM-DD'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="YYYY-MM-DD"
            />
          )}
          name="ngaySinh"
        />
        {errors.ngaySinh && <Text style={styles.errorText}>{errors.ngaySinh.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hệ số lương</Text>
        <Controller
          control={control}
          rules={{
            required: 'Hệ số lương không được để trống',
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: 'Hệ số lương phải là số'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nhập hệ số lương"
              keyboardType="numeric"
            />
          )}
          name="heSoLuong"
        />
        {errors.heSoLuong && <Text style={styles.errorText}>{errors.heSoLuong.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Lương cơ bản</Text>
        <Controller
          control={control}
          rules={{
            required: 'Lương cơ bản không được để trống',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Lương cơ bản phải là số nguyên'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nhập lương cơ bản"
              keyboardType="numeric"
            />
          )}
          name="luongCB"
        />
        {errors.luongCB && <Text style={styles.errorText}>{errors.luongCB.message}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Thêm Người Dùng</Text>
        )}
      </TouchableOpacity>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// return (
//   <>
//     <SafeAreaInsetsContext.Consumer>
//       {(insets) => (
//         < >
//           {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
//           <View style={[styles.container]} >

//             <Footer screen={'AddUser'} />
//           </View>
//         </>
//       )}
//     </SafeAreaInsetsContext.Consumer>
//   </>
// );
// };



export default AddUser;
