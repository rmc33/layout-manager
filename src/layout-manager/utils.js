const computeItemHeight = (itemHeight, totalHeight, accumulatedHeight, rowHeight, margin) => {
    if (itemHeight.indexOf('%') !== -1) {
        const h = (parseFloat(itemHeight) / 100.0) * totalHeight;
        return Math.round(h / (rowHeight + margin));
    }
    if (itemHeight === 'rest') {
        return Math.round(totalHeight - accumulatedHeight / (rowHeight + margin));
    }
    return itemHeight;
}

const computeItemWidth = (itemWidth, totalWidth, accumulatedWidth, numberCols, margin) => {
    if (itemWidth.indexOf('%') !== -1) {
        const w = (parseFloat(itemWidth) / 100.0) * totalWidth;
        return Math.round(w - margin * 2 / numberCols);
    }
    if (itemWidth === 'rest') {
        return Math.round(totalWidth - accumulatedWidth - margin * 2 / numberCols);
    }
}

export function generatePercentageLayouts(layouts, height, width, rowHeight, cols, margin) {
    const generatedLayout = Object.keys(layouts).reduce((accumulator, layoutKey) => {
        accumulator.layouts[layoutKey] = layouts[layoutKey].map(layout => {
            const item = { ...layout };
            if (typeof item.h === 'string') {
                item.h = computeItemHeight(item.h, height, accumulator.height, rowHeight, margin[1]);
            }
            if (typeof item.y === 'string') {
                item.y = computeItemHeight(item.y, height, accumulator.height, rowHeight, margin[1]);
            }
            if (typeof item.w === 'string') {
                item.w = computeItemWidth(item.w, width, accumulator.width, cols[layoutKey], margin[0]);
            }
            if (typeof item.x === 'string') {
               item.x = computeItemWidth(item.x, width, accumulator.width, cols[layoutKey], margin[0]);
            }   
            accumulator.height += item.y;
            accumulator.width += item.w;
            return item;
        });
        return accumulator;
    }, { height: 0, width: 0, layouts: {} });
    return generatedLayout;
}