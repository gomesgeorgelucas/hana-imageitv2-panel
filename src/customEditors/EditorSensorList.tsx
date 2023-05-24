import React from 'react';
import { css } from '@emotion/css';
import { useStyles2, useTheme2, Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../types/Sensor';
import { GrafanaTheme2, StandardEditorProps } from '@grafana/data';

interface Props extends StandardEditorProps<Sensor[]> {}

const defaultNewSensor: Sensor = {
  name: 'Name',
  query: {
    id: 'A',
    alias: '',
  },
  visible: true,
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
  mappingIds: [],
  unit: undefined,
  decimals: 2,
  valueBlink: false,
  iconName: '',
  backgroundBlink: false,
};

export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { onChange } = props;
  const sensors = props.value;

  const theme = useTheme2();

  const getStyles = (theme: GrafanaTheme2) => ({
    sensorItemWrapperStyle: css`
      margin-bottom: 16px;
      padding: 8px;
      background-color: ${theme.colors.background.secondary};
    `,

    addButtonStyle: css`
      /* margin-left: 8px; */
    `,
  });

  const styles = useStyles2(() => getStyles(theme));

  const onSensorChange = (sensor: Sensor, index: number) => {
    sensors[index] = sensor;

    onChange(sensors);
  };

  const onSensorDelete = (index: number) => {
    sensors.splice(index, 1);

    onChange(sensors);
  };

  const addNewSensor = () => {
    sensors.push(defaultNewSensor);

    onChange(sensors);
  };

  return (
    <>
      {/* list of existing sensors */}
      {sensors &&
        sensors.map((sensor: Sensor, index: number) => {
          return (
            <div className={styles.sensorItemWrapperStyle} key={index}>
              <EditorSensorItem sensor={sensor} onChange={onSensorChange} onDelete={onSensorDelete} index={index} />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewSensor} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};
