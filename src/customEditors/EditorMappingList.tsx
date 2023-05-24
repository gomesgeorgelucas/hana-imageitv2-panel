import React from 'react';
import { css } from '@emotion/css';
import { useStyles2, Button, useTheme2 } from '@grafana/ui';
import { GrafanaTheme2, SelectableValue, StandardEditorProps } from '@grafana/data';
import { EditorMappingItem } from './EditorMappingItem';
import { Mapping } from 'types/Mapping';
import MappingOperators from 'MappingOperators';

interface Props extends StandardEditorProps<Mapping[]> {}

const getRandomID = function () {
  const randomString = Math.random().toString(36).substr(2, 5);

  return 'mapping-' + randomString;
};

const operatorsOptions: SelectableValue[] = MappingOperators.map((mappingOperator) => ({
  label: mappingOperator.operator,
  value: mappingOperator.id,
  description: mappingOperator.description,
}));

export const EditorMappingList: React.FC<Props> = (props: Props) => {
  const onChange = props.onChange;
  const mappings = props.value;

  const theme = useTheme2();

  const getStyles = (theme: GrafanaTheme2) => ({
    mappingItemWrapper: css`
      margin-bottom: 16px;
      padding: 8px;
      background-color: ${theme.colors.background.secondary};
    `,

    addButtonStyle: css`
      /* margin-left: 8px; */
    `,
  });

  const styles = useStyles2(() => getStyles(theme));

  const defaultNewMapping: Mapping = {
    id: getRandomID(),
    description: '',
    compareTo: 0,
    operator: MappingOperators[0].id,

    values: {
      fontColor: '#fff',
      backgroundColor: '#000',
      valueBlink: false,
      backgroundBlink: false,
      bold: false,
      visible: true,
      overrideValue: undefined,
    },
  };

  const onMappingChange = (mapping: Mapping, index: number) => {
    mappings[index] = mapping;

    onChange(mappings);
  };

  const onMappingDelete = (index: number) => {
    mappings.splice(index, 1);

    onChange(mappings);
  };

  const addNewMapping = () => {
    mappings.push(defaultNewMapping);

    onChange(mappings);
  };

  return (
    <>
      {/* list of existing mappings */}
      {mappings &&
        mappings.map((mapping: Mapping, index: number) => {
          return (
            <div className={styles.mappingItemWrapper} key={index}>
              <EditorMappingItem
                mapping={mapping}
                operatorsOptions={operatorsOptions}
                onChange={onMappingChange}
                onDelete={onMappingDelete}
                index={index}
              />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewMapping} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};
