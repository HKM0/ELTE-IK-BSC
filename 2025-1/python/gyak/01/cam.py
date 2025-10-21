import cv2
# csak pelda volt de megirtam kb
def main():
	cap = cv2.VideoCapture(0)
	if not cap.isOpened():
		print("nem sikerult megnyitni a kamerat.")
		return
	while True:
		ret, frame = cap.read()
		if not ret:
			break
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		edges = cv2.Canny(gray, 100, 200)

		black = frame.copy()
		black[:] = 0
		# kek korvonal fekete hatteren
		contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
		cv2.drawContours(black, contours, -1, (255, 0, 0), 2)
		cv2.imshow('kamera korvonalak', black)
		if cv2.waitKey(1) & 0xFF == ord('q'):
			break
	cap.release()
	cv2.destroyAllWindows()

if __name__ == "__main__":
	main()

