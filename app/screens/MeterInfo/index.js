import {
    CategoryList,
    Header,
    Icon,
    SafeAreaView,
    Text,
    TextInput,
    CardReport05,
    ListTransaction
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FChooseCategories } from "@data";
import { useNavigation, useRoute } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import getUser from "../../selectors/UserSelectors";


export default function MeterInfoScreen() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();

    const [loading, setLoading] = useState("");
    const [category, setCategory] = useState("");
    const [categoryChoosed, setCategoryChoosed] = useState({});
    const [categories, setCategories] = useState(FChooseCategories);
    const navigation = useNavigation();
    const route = useRoute();

    const users = useSelector((state) => getUser(state));
    const [email, setEmail] = useState(users.user);

    // useEffect(() => {
    //     if (route?.params?.category) {
    //         setCategoryChoosed(route?.params?.category ?? {});
    //     }
    // }, [route?.parmas]);

    /**
     * Called when apply change language
     */
    const saveCategory = () => {
        navigation.navigate({
            name: "FAddTransaction",
            params: { category: categoryChoosed },
            merge: true,
        });
    };

    const filterCategory = (text) => {
        setCategory(text);
        if (text) {
            setCategories(
                FChooseCategories.filter(
                    (item) =>
                        haveChildren(item.title, text) ||
                        haveChildren(item.subtitle, text)
                )
            );
        } else {
            setCategories(FChooseCategories);
        }
    };

    useEffect(() => {
        getMeterInfo()
    });

    const getMeterInfo = async () => {
        const data = {
          email: email,
        };
    
        const config = {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            // token: "",
          },
        };
    
        await axios
          .get(
            // `http://34.87.121.155:2121/apiwebpbi/api/getDataFilter/IFCAPB/01/01/${data.email}/01/2020`,
            `http://34.87.121.155:2121/apiwebpbi/api/getDataFilter/IFCAPB/01/01/andi@ifca.co.id/09/2017`,
            {
              config,
            },
          )
          .then(res => {
            const datas = res.data;
            console.log('data Meter Info', datas)
            // const arrDataTower = datas.Data;
            // arrDataTower.map(dat => {
            //   if (dat) {
            //     setdataTowerUser(dat);
            //   }
            // });
            // setArrDataTowerUser(arrDataTower);
            // setSpinner(false);
            // return res.data;
          })
          .catch(error => {
            console.log('error get meter info api', error);
            alert('error get');
          });
      };


    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <Header
                title={t("Meter Info")}
                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            color={colors.text}
                            enableRTL={true}
                        />
                    );
                }}
                // renderRight={() => {
                //     if (loading) {
                //         return (
                //             <ActivityIndicator
                //                 size="small"
                //                 color={colors.primary}
                //             />
                //         );
                //     } else {
                //         return (
                //             <Text headline primaryColor numberOfLines={1}>
                //                 {t("save")}
                //             </Text>
                //         );
                //     }
                // }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
                onPressRight={saveCategory}
            />
            <View style={styles.contain}>
                        <ListTransaction
                            icon={"exchange-alt"}
                            name="Paypal"
                            date="Jun 06, 2021 05:00 pm"
                            status="Paid 3900USD"
                            price="-$129"
                        />
                    {/* <TextInput
                        // onChangeText={filterCategory}
                        placeholder={t("Search")}
                        value={category}
                        icon={
                            <TouchableOpacity
                                // onPress={() => filterCategory("")}
                            >
                                <Icon
                                    name="times"
                                    size={16}
                                    color={BaseColor.grayColor}
                                />
                            </TouchableOpacity>
                        }
                    /> */}
                {/* <Text> Test ae </Text> */}
                {/* <View
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        paddingBottom: 20,
                    }}
                >
                    <TextInput
                        onChangeText={filterCategory}
                        placeholder={t("enter_a_category")}
                        value={category}
                        icon={
                            <TouchableOpacity
                                onPress={() => filterCategory("")}
                            >
                                <Icon
                                    name="times"
                                    size={16}
                                    color={BaseColor.grayColor}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <CategoryList
                            isImageRound
                            onPress={() => setCategoryChoosed(item)}
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor:
                                    categoryChoosed.id == item.id
                                        ? colors.card
                                        : colors.background,
                            }}
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    )}
                /> */}
            </View>
        </SafeAreaView>
    );
}
