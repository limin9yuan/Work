/*
jQWidgets v3.6.0 (2014-Nov-25)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a) {
	a.extend(a.jqx._jqxGrid.prototype, {
		exportdata : function(q, z, y, o, r, t, f) {
			if (!a.jqx.dataAdapter.ArrayExporter) {
				throw "jqxGrid: Missing reference to jqxdata.export.js!"
			}
			if (y == undefined) {
				y = true
			}
			var H = this;
			if (o == undefined) {
				var o = this.getrows();
				if (o.length == 0) {
					throw "No data to export."
				}
			}
			this.exporting = true;
			if (!this.pageable) {
				this.loadondemand = true
			}
			if (this.altrows) {
				this._renderrows(this.virtualsizeinfo)
			}
			var F = r != undefined ? r : false;
			var E = {};
			var n = {};
			var v = [];
			var l = this.host.find(".jqx-grid-cell:first");
			var w = this.host.find(".jqx-grid-cell-alt:first");
			l.removeClass(this.toThemeProperty("jqx-grid-cell-selected"));l.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));w.removeClass(this.toThemeProperty("jqx-grid-cell-selected"));w.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));l.removeClass(this.toThemeProperty("jqx-grid-cell-hover"));l.removeClass(this.toThemeProperty("jqx-fill-state-hover"));w.removeClass(this.toThemeProperty("jqx-grid-cell-hover"));w.removeClass(this.toThemeProperty("jqx-fill-state-hover"));
			var g = "cell";
			var e = 1;
			var G = "column";
			var c = 1;
			var h = [];
			for (var B = 0; B < this.columns.records.length; B++) {
				var d = this.columns.records[B];
				if (d.cellclassname != "") {
					d.customCellStyles = new Array();
					if (typeof d.cellclassname == "string") {
						for (var C = 0; C < o.length; C++) {
							d.customCellStyles[C] = d.cellclassname
						}
					} else {
						for (var C = 0; C < o.length; C++) {
							var u = this.getrowboundindex(C);
							var b = d.cellclassname(u, d.displayfield, o[C][d.displayfield], o[C]);
							if (b) {
								d.customCellStyles[C] = b
							}
						}
					}
				}
			}
			var x = new Array();
			a.each(this.columns.records, function(K) {
				var N = a(H.table[0].rows[0].cells[K]);
				if (H.table[0].rows.length > 1) {
					var j = a(H.table[0].rows[1].cells[K])
				}
				var J = this;
				var L = function(P) {
					P.removeClass(H.toThemeProperty("jqx-grid-cell-selected"));P.removeClass(H.toThemeProperty("jqx-fill-state-pressed"));P.removeClass(H.toThemeProperty("jqx-grid-cell-hover"));P.removeClass(H.toThemeProperty("jqx-fill-state-hover"));
					if (J.customCellStyles) {
						for (var Q in J.customCellStyles) {
							P.removeClass(J.customCellStyles[Q])
						}
					}
				};
				L(N);
				if (j) {
					L(j)
				}
				if (this.displayfield == null) {
					return true
				}
				if (H.showaggregates) {
					if (H.getcolumnaggregateddata) {
						h.push(H.getcolumnaggregateddata(this.displayfield, this.aggregates, true, o))
					}
				}
				var M = H._getexportcolumntype(this);
				if (this.exportable && (!this.hidden || F)) {
					E[this.displayfield] = {};
					E[this.displayfield].text = this.text;
					E[this.displayfield].width = parseInt(this.width);
					if (isNaN(E[this.displayfield].width)) {
						E[this.displayfield].width = 60
					}
					E[this.displayfield].formatString = this.cellsformat;
					E[this.displayfield].localization = H.gridlocalization;
					E[this.displayfield].type = M;
					E[this.displayfield].cellsAlign = this.cellsalign;
					E[this.displayfield].hidden = !y;
					E[this.displayfield].displayfield = this.displayfield;x.push(E[this.displayfield])
				}
				g = "cell" + e;
				var O = a(this.element);
				if (this.element == undefined) {
					O = a(this.uielement)
				}
				G = "column" + c;
				if (q == "html" || q == "xls" || q == "pdf") {
					var i = function(P, X, W, Q, V, S, R, T, U) {
						n[P] = {};
						if (X == undefined) {
							return
						}
						n[P]["font-size"] = X.css("font-size");
						n[P]["font-weight"] = X.css("font-weight");
						n[P]["font-style"] = X.css("font-style");
						n[P]["background-color"] = S._getexportcolor(X.css("background-color"));
						n[P]["color"] = S._getexportcolor(X.css("color"));
						n[P]["border-color"] = S._getexportcolor(X.css("border-top-color"));
						if (W) {
							n[P]["text-align"] = V.align
						} else {
							n[P]["text-align"] = V.cellsalign;
							n[P]["formatString"] = V.cellsformat;
							n[P]["dataType"] = M
						}
						if (q == "html" || q == "pdf") {
							n[P]["border-top-width"] = X.css("border-top-width");
							n[P]["border-left-width"] = X.css("border-left-width");
							n[P]["border-right-width"] = X.css("border-right-width");
							n[P]["border-bottom-width"] = X.css("border-bottom-width");
							n[P]["border-top-style"] = X.css("border-top-style");
							n[P]["border-left-style"] = X.css("border-left-style");
							n[P]["border-right-style"] = X.css("border-right-style");
							n[P]["border-bottom-style"] = X.css("border-bottom-style");
							if (W) {
								if (R == 0) {
									n[P]["border-left-width"] = X.css("border-right-width")
								}
								n[P]["border-top-width"] = X.css("border-right-width");
								n[P]["border-bottom-width"] = X.css("border-bottom-width")
							} else {
								if (R == 0) {
									n[P]["border-left-width"] = X.css("border-right-width")
								}
							}
							n[P]["height"] = X.css("height")
						}
						if (V.exportable && (!V.hidden || F)) {
							if (T == true) {
								if (!E[V.displayfield].customCellStyles) {
									E[V.displayfield].customCellStyles = new Array()
								}
								E[V.displayfield].customCellStyles[U] = P
							} else {
								if (W) {
									E[V.displayfield].style = P
								} else {
									if (!Q) {
										E[V.displayfield].cellStyle = P
									} else {
										E[V.displayfield].cellAltStyle = P
									}
								}
							}
						}
					};
					i(G, O, true, false, this, H, K);c++;i(g, N, false, false, this, H, K);
					if (H.altrows) {
						g = "cellalt" + e;i(g, j, false, true, this, H, K)
					}
					if (this.customCellStyles) {
						for (var I in J.customCellStyles) {
							N.removeClass(J.customCellStyles[I])
						}
						for (var I in J.customCellStyles) {
							N.addClass(J.customCellStyles[I]);i(g + J.customCellStyles[I], N, false, false, this, H, K, true, I);N.removeClass(J.customCellStyles[I])
						}
					}
					e++
				}
			});a.each(this.columns.records, function(i) {
				if (E[this.displayfield]) {
					E[this.displayfield].columnsDataFields = x
				}
			});
			if (this.showaggregates) {
				var D = [];
				var A = q == "xls" ? "_AG" : "";
				var k = this.groupable ? this.groups.length : 0;
				if (this.rowdetails) {
					k++
				}
				if (h.length > 0) {
					a.each(this.columns.records, function(j) {
						if (this.aggregates) {
							for (var J = 0; J < this.aggregates.length; J++) {
								if (!D[J]) {
									D[J] = {}
								}
								if (D[J]) {
									var K = H._getaggregatename(this.aggregates[J]);
									var L = H._getaggregatetype(this.aggregates[J]);
									var I = h[j - k];
									if (I) {
										D[J][this.displayfield] = A + K + ": " + I[L]
									}
								}
							}
						}
					});a.each(this.columns.records, function(j) {
						for (var I = 0; I < D.length; I++) {
							if (D[I][this.displayfield] == undefined) {
								D[I][this.displayfield] = A
							}
						}
					})
				}
				a.each(D, function() {
					o.push(this)
				})
			}
			var m = this;
			var s = a.jqx.dataAdapter.ArrayExporter(o, E, n);
			if (z == undefined) {
				this._renderrows(this.virtualsizeinfo);
				var p = s.exportTo(q);
				if (this.showaggregates) {
					a.each(D, function() {
						o.pop(this)
					})
				}
				setTimeout(function() {
					m.exporting = false
				}, 50);return p
			} else {
				s.exportToFile(q, z, t, f)
			}
			if (this.showaggregates) {
				a.each(D, function() {
					o.pop(this)
				})
			}
			this._renderrows(this.virtualsizeinfo);setTimeout(function() {
				m.exporting = false
			}, 50)
		},
		_getexportcolor : function(l) {
			var f = l;
			if (l == "transparent") {
				f = "#FFFFFF"
			}
			if (!f || !f.toString()) {
				f = "#FFFFFF"
			}
			if (f.toString().indexOf("rgb") != -1) {
				var i = f.split(",");
				if (f.toString().indexOf("rgba") != -1) {
					var d = parseInt(i[0].substring(5));
					var h = parseInt(i[1]);
					var j = parseInt(i[2]);
					var k = parseInt(i[3].substring(1, 4));
					var m = {
						r : d,
						g : h,
						b : j
					};
					var e = this._rgbToHex(m);
					if (d == 0 && h == 0 && j == 0 && k == 0) {
						return "#ffffff"
					}
					return "#" + e
				}
				var d = parseInt(i[0].substring(4));
				var h = parseInt(i[1]);
				var j = parseInt(i[2].substring(1, 4));
				var m = {
					r : d,
					g : h,
					b : j
				};
				var e = this._rgbToHex(m);
				return "#" + e
			} else {
				if (f.toString().indexOf("#") != -1) {
					if (f.toString().length == 4) {
						var c = f.toString().substring(1, 4);
						f += c
					}
				}
			}
			return f
		},
		_rgbToHex : function(b) {
			return this._intToHex(b.r) + this._intToHex(b.g) + this._intToHex(b.b)
		},
		_intToHex : function(c) {
			var b = (parseInt(c).toString(16));
			if (b.length == 1) {
				b = ("0" + b)
			}
			return b.toUpperCase()
		},
		_getexportcolumntype : function(f) {
			var g = this;
			var e = "string";
			var d = g.source.datafields || ((g.source._source) ? g.source._source.datafields : null);
			if (d) {
				var i = "";
				a.each(d, function() {
					if (this.name == f.displayfield) {
						if (this.type) {
							i = this.type
						}
						return false
					}
				});
				if (i) {
					return i
				}
			}
			if (f != null) {
				if (this.dataview.cachedrecords == undefined) {
					return e
				}
				var b = null;
				if (!this.virtualmode) {
					if (this.dataview.cachedrecords.length == 0) {
						return e
					}
					b = this.dataview.cachedrecords[0][f.displayfield];
					if (b != null && b.toString() == "") {
						return "string"
					}
				} else {
					a.each(this.dataview.cachedrecords, function() {
						b = this[f.displayfield];return false
					})
				}
				if (b != null) {
					if (f.cellsformat.indexOf("c") != -1) {
						return "number"
					}
					if (f.cellsformat.indexOf("n") != -1) {
						return "number"
					}
					if (f.cellsformat.indexOf("p") != -1) {
						return "number"
					}
					if (f.cellsformat.indexOf("d") != -1) {
						return "date"
					}
					if (f.cellsformat.indexOf("y") != -1) {
						return "date"
					}
					if (f.cellsformat.indexOf("M") != -1) {
						return "date"
					}
					if (f.cellsformat.indexOf("m") != -1) {
						return "date"
					}
					if (f.cellsformat.indexOf("t") != -1) {
						return "date"
					}
					if (typeof b == "boolean") {
						e = "boolean"
					} else {
						if (a.jqx.dataFormat.isNumber(b)) {
							e = "number"
						} else {
							var h = new Date(b);
							if (h.toString() == "NaN" || h.toString() == "Invalid Date") {
								if (a.jqx.dataFormat) {
									h = a.jqx.dataFormat.tryparsedate(b);
									if (h != null) {
										if (h && h.getFullYear()) {
											if (h.getFullYear() == 1970 && h.getMonth() == 0 && h.getDate() == 1) {
												var c = new Number(b);
												if (!isNaN(c)) {
													return "number"
												}
												return "string"
											}
										}
										return "date"
									} else {
										e = "string"
									}
								} else {
									e = "string"
								}
							} else {
								e = "date"
							}
						}
					}
				}
			}
			return e
		}
	})
})(jqxBaseFramework);