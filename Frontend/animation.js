const animationTime = 300;

function hide_show(hide, show) {
  $(hide).animate({
    opacity: 0
  }, animationTime, () => {
    $(hide).css("display", "none");
    $(show).css("opacity", 0);
    $(show).css("display", "block");
    $(show).animate({
      opacity: 1
    }, animationTime);
  });
}

function hide(content) {
	$(content).animate({
		opacity: 0
	}, animationTime, () => {
		$(content).css("display", "none");
	});
}

function show(content) {
	$(content).css("display", "block");
	$(content).animate({
		opacity: 1
	}, animationTime);
}