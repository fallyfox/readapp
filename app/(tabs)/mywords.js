import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AlphabetWords } from '../../components/mywords';
import { sizes } from '../../utilities/sizes';
import { appTheme } from '../../utilities/theme.colors';

// Helper function to get a random index
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Helper function to initialize word indices for all letters
const initializeWordIndices = () => {
  const indices = {};
  Object.keys(AlphabetWords).forEach((letter) => {
    const wordCount = AlphabetWords[letter].length;
    indices[letter] = getRandomIndex(wordCount);
  });
  return indices;
};

export default function Mywords() {
    const { width } = useWindowDimensions();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [wordIndices, setWordIndices] = useState(initializeWordIndices);
    const soundRef = useRef(null);

    // Preload sound once on mount
    React.useEffect(() => {
        let mounted = true;
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../sounds/pop.mp3')
                );
                if (mounted) {
                    soundRef.current = sound;
                }
            } catch (e) {
                console.log('[mywords] Error preloading sound', e);
            }
        };
        loadSound();

        return () => {
            mounted = false;
            if (soundRef.current) {
                soundRef.current.unloadAsync().catch(() => {});
            }
        };
    }, []);

    async function playSound() {
        try {
            if (!soundRef.current) return;
            await soundRef.current.setPositionAsync(0);
            await soundRef.current.playAsync();
        } catch (e) {
            console.log('[mywords] Error playing sound', e);
        }
    }

    const handleLetterPress = useCallback((letter) => {
        setSelectedLetter(letter);
        playSound();
    }, []);

    const handleShuffleAllWords = useCallback(() => {
        setWordIndices(initializeWordIndices());
        playSound();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: appTheme.peach }]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.mainHeader}>WORDS</Text>
                        <TouchableOpacity
                            style={styles.shuffleButton}
                            onPress={handleShuffleAllWords}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <MaterialCommunityIcons name="shuffle-variant" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {Object.entries(AlphabetWords).map(([letter, words]) => (
                        <View key={letter} style={styles.letterSection}>
                            <Text style={styles.letterHeader}>{letter}</Text>
                            <View style={styles.wordsContainer}>
                                {wordIndices[letter] !== undefined && (
                                    <TouchableOpacity
                                        key={`${letter}-${wordIndices[letter]}`}
                                        style={[
                                            styles.wordCard,
                                            selectedLetter === letter && styles.selectedCard,
                                            { width: width * 0.5 }
                                        ]}
                                        onPress={() => handleLetterPress(letter)}
                                    >
                                        <Text style={[styles.wordText, selectedLetter === letter && styles.wordTextSelected]}>{words[wordIndices[letter]]}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingVertical: sizes.spacingLarge,
        paddingHorizontal: sizes.spacingMedium,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: sizes.spacing,
    },
    shuffleButton: {
        padding: sizes.spacing,
    },
    mainHeader: {
        fontSize: sizes.scale(sizes.fontHeader),
        fontWeight: '800',
        color: "black",
        textAlign: 'center',
        marginVertical: sizes.spacing,
        letterSpacing: sizes.scale(4),
        fontFamily: "Fontspring-DEMO-leyendo-bold"

    },
    scrollContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: sizes.spacing,
        borderTopLeftRadius: sizes.radiusLarge,
        borderTopRightRadius: sizes.radiusLarge,
    },
    letterSection: {
        marginBottom: sizes.spacingLarge,
    },
    letterHeader: {
        fontSize: sizes.scale(sizes.fontTitle),
        fontWeight: 'bold',
        color: appTheme.navy,
        marginBottom: sizes.spacing,
        paddingLeft: sizes.spacing,
    },
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: sizes.spacing,
    },
    wordCard: {
        backgroundColor: '#f0f0f0',
        padding: sizes.spacingMedium,
        borderRadius: sizes.radiusMedium,
        marginBottom: sizes.spacing,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: sizes.scale(3.84),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCard: {
        backgroundColor: appTheme.peach,
        borderWidth: 5,
        borderColor: '#000',
        transform: [{ scale: 1.02 }],
        shadowOpacity: 0.12,
     
        
        
    },
    wordText: {
        fontSize: sizes.scale(sizes.fontBody),
        color: appTheme.navy,
        textAlign: 'center',
        fontFamily:"BrophyOpti",
        fontWeight:"800",
       
        
    },
    wordTextSelected: {
        color: '#fff',
        fontFamily:"BrophyOpti",
        fontWeight:"900",
        fontSize: sizes.scale(sizes.fontBody) +4 ,
    },
});
       