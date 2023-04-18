import { StyleSheet, FlatList, View, Text, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { playListData } from '../constants';
import
TrackPlayer, {
    Event,
    Track,
    useTrackPlayerEvents
} from 'react-native-track-player';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
import { getColors, Colors } from '../utils/colourPicker';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const MusicPlayer = (): JSX.Element => {
    const [track, setTrack] = useState<Track | null>();
    const [colors, setColors] = useState<Colors | null>(null);
    const imageUrl = 'https://i.imgur.com/68jyjZT.jpg';

    useEffect(() => {
        const fetchColors = async () => {
            const colors = await getColors(track?.artwork?.toString() || imageUrl);
            setColors(colors);
        }
        fetchColors();
    }, [track])

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        switch (event.type) {
            case Event.PlaybackTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
                setTrack(playingTrack);
                break;
            default:
                break;
        }
    });

    const renderArtwork = (): JSX.Element => {
        return (
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {track?.artwork && (
                        <Image
                            style={styles.albumArtImg}
                            source={{ uri: track?.artwork?.toString() }}
                        />
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors?.colorTwo?.value || "white", "black"]}
                style={styles.gradient}
            >
                <View style={styles.childContainer}>
                    <FlatList
                        horizontal
                        data={playListData}
                        renderItem={renderArtwork}
                        keyExtractor={song => song.id.toString()}
                    />
                    <SongInfo track={track} />
                    <SongSlider />
                    <ControlCenter />
                </View>
            </LinearGradient>
        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {flex:1},
    childContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
    },
    listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumContainer: {
        width: 300,
        height: 300,
    },
    albumArtImg: {
        height: '100%',
        borderRadius: 4,
    },
});