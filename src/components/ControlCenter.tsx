import { View, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icon from "react-native-vector-icons/MaterialIcons";
import { playbackService } from '../../musicPlayerServices';

const ControlCenter = () => {

    const playBackState = usePlaybackState();

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    }

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    }

    const togglePlayback = async (playBack: State) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            if (playBack === State.Paused ||
                playBack === State.Ready
            ) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    return (
        <View >
            <View style={styles.container}>
                <Pressable onPress={skipToPrevious}>
                    <Icon style={styles.icon} name="skip-previous" size={40} />
                </Pressable>
                <Pressable onPress={() => togglePlayback(playBackState)}>
                    <Icon
                        style={styles.icon}
                        name={playBackState === State.Playing ? "pause" : "play-arrow"}
                        size={75} />
                </Pressable>
                <Pressable onPress={skipToNext}>
                    <Icon style={styles.icon} name="skip-next" size={40} />
                </Pressable>

            </View>
        </View>
    )
}

export default ControlCenter;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});