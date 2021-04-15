import { yupToFormErrors } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as Location from "expo-location";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import {
  AppFormField,
  AppForm,
  SubmitButton,
  AppFormPicker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    icon: "floor-lamp",
    backgroundColor: "red",
  },
  { label: "Cars", value: 2, icon: "car", backgroundColor: "green" },
  { label: "Cameras", value: 3, icon: "camera", backgroundColor: "blue" },
  { label: "Games", value: 4, icon: "cards-outline", backgroundColor: "red" },
  {
    label: "Clothing",
    value: 5,
    icon: "shoe-heel",
    backgroundColor: "green",
  },
  {
    label: "Sports",
    value: 6,
    icon: "basketball",
    backgroundColor: "blue",
  },
  {
    label: "Movies & Music",
    value: 7,
    icon: "music",
    backgroundColor: "red",
  },
  {
    label: "Books",
    value: 8,
    icon: "book-open-variant",
    backgroundColor: "green",
  },
  { label: "Others", value: 9, icon: "application", backgroundColor: "blue" },
];

function ListingEditScreen(props) {
  const location = useLocation();
  return (
    <Screen>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={(values) => console.log(location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default ListingEditScreen;
