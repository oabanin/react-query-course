import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import React from 'react';

import { Calendar } from '../components/appointments/Calendar';
import { PaletteTree } from './palette';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Calendar">
        <Calendar />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
