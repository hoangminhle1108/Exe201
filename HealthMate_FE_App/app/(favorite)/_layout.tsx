import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="favBlog"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="favRecipe"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
