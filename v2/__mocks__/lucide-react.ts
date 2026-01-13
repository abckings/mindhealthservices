// v2/__mocks__/lucide-react.ts
import React from 'react';

// Create a Proxy to handle any icon import
const iconsHandler = {
  get: function(target: any, prop: string) {
    // Return a component for any property access (e.g., Lucide.Menu)
    const IconComponent = React.forwardRef((props: any, ref) =>
      React.createElement('svg', { ...props, ref, 'data-testid': `icon-${prop}` })
    );
    IconComponent.displayName = `Lucide.${prop}`;
    return IconComponent;
  }
};

const LucideIcons = new Proxy({}, iconsHandler);

export default LucideIcons;
module.exports = LucideIcons;
