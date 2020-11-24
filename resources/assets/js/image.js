import m from 'mithril'

export default {
	oninit: function(vnode) {
    vnode.state.hasIntersected = false;
    vnode.state.intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.isVisible) {
            vnode.state.hasIntersected = true;
            observer.disconnect();
            m.redraw();
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: ".15"
      }
    );
	},
	view: function(vnode) {
		var attrs = vnode.attrs;
		var loadedClassName = vnode.loadedClassName || 'img-loaded'
		attrs.src = this.hasIntersected ? vnode.attrs.dataSrc : vnode.attrs.dataLQSrc || '',
		attrs.class = (this.hasIntersected ? (loadedClassName + ' ') : ' ') + (vnode.attrs.class || '')
		return m('img', attrs);
	},
	oncreate: function(vnode) {
    vnode.state.intersectionObserver.observe(vnode.dom.parentNode);
	}
}
