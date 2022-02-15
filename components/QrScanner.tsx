import React, { useContext, useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from './ui/styleUtils';
import { Button, Text } from './ui';
import { GlobalContext } from '../shared/GlobalContext';
import { useSelector } from '@xstate/react';
import { selectIsActive } from '../machines/app';

const styles = StyleSheet.create({
  scannerContainer: {
    borderWidth: 4,
    borderColor: Colors.Black,
    borderRadius: 32,
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
  },
  scanner: {
    height: 400,
    width: '100%',
    margin: 'auto'
  },
  buttonContainer: {
    height: '100%',
    width: '100%',
  },
  flipButtonContainer: {
    position: 'absolute',
    width: '80%',
    top: '110%',
  },
  buttonStyle: {
    position: 'absolute',
    width: '100%',
    bottom: -90,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export const QrScanner: React.FC<QrScannerProps> = (props) => {
  const { appService } = useContext(GlobalContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const isActive = useSelector(appService, selectIsActive);

  const openSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    (async () => {
      const response = await Camera.requestCameraPermissionsAsync();
      setHasPermission(response.granted);
    })();
  }, []);

  useEffect(() => {
    if (isActive && hasPermission === false) {
      (async () => {
        const response = await Camera.requestCameraPermissionsAsync();
        setHasPermission(response.granted);
      })();
    }
  }, [isActive]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.buttonContainer}>
        <Text align="center">
          This app uses the camera to scan the QR code of another device.
        </Text>
        <View style={styles.buttonStyle}>
          <Button title="Allow access to camera" onPress={openSettings} />
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.scannerContainer}>
        <Camera
          style={styles.scanner}
          barCodeScannerSettings={{
            barcodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
          }}
          onBarCodeScanned={scanned ? undefined : onBarcodeScanned}
          type={type}
          />
      </View>
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Icon name="flip-camera-ios" color={Colors.Black} size={64} />
        </TouchableOpacity>
      </View>
    </View>
  );

  function onBarcodeScanned(event: BarCodeEvent) {
    props.onQrFound(event.data);
    setScanned(true);
  }
};

interface QrScannerProps {
  onQrFound: (data: string) => void;
}
