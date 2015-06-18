const HighlightBehavior = {
  properties: {
    isHighlighted: {
      type: Boolean,
      value: false,
      observer: '_highlightChanged'
    }
  },

  listeners: {
    tap: '_toggleHighlight'
  },

  created() {
    console.log(`Highlighting for element <${this.tagName}> enabled.`);
  },

  _toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  },

  _highlightChanged(value) {
    // similar to Polymer.dom(this).toggleClass('highlighted', value)
    this.toggleClass('highlighted', value);
  }
};

export default HighlightBehavior;
